import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import mimeType from "mime-types";
import counterService from "../services/counter";

interface ThemeListType {
  [key: string]: Record<string, { width?: number; height?: number; data: any }>;
}

class CounterController {
  themePath = path.resolve(__dirname, "../theme");
  themeList: ThemeListType = {};

  private convertToDatauri(path: string) {
    const mime = mimeType.lookup(path);
    const base64 = fs.readFileSync(path).toString("base64");

    return `data:${mime};base64,${base64}`;
  }

  private async getCountByName(name: string) {
    const count = await counterService.getCountByName(name);
    return count;
  }

  private async genThemeList() {
    const { themeList } = this;
    fs.readdirSync(this.themePath).forEach((theme) => {
      if (!(theme in themeList)) themeList[theme] = {};
      const imgList = fs.readdirSync(path.resolve(this.themePath, theme));
      imgList.forEach((img) => {
        const imgPath = path.resolve(this.themePath, theme, img);
        // import("../assets/theme/asoul/0.gif").then((res) => {
        //   console.log(res);
        // });

        const name = path.parse(img).name;
        const { width, height } = sizeOf(imgPath);
        themeList[theme][name] = {
          width,
          height,
          data: this.convertToDatauri(imgPath),
        };
      });
    });
  }

  async getCountImage(name: string, theme: string, length = 7) {
    return __dirname;
    const count = await this.getCountByName(name);
    await this.genThemeList();

    const { themeList } = this;

    // This is not the greatest way for generating an SVG but it'll do for now
    const countArray = count.toString().padStart(length, "0").split("");
    let x = 0;
    let y = 0;
    const parts = countArray.reduce((acc, next) => {
      const { width = 45, height = 100, data } = themeList[theme][next];
      const image = `${acc}
        <image x="${x}" y="0" width="${width}" height="${height}" xlink:href="${data}" />`;
      x += width;
      if (height > y) y = height;
      return image;
    }, "");
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${x}" height="${y}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Moe Count</title>
    <g>
      ${parts}
    </g>
</svg>
`;
  }
}

export default new CounterController();
