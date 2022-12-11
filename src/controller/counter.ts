import counterService from "../services/counter";
import getThemeList from "../data/getThemeList";

interface ThemeListType {
  [key: string]: Record<string, { width?: number; height?: number; data: any }>;
}

class CounterController {
  themeList: ThemeListType = getThemeList();
  private async getCountByName(name: string) {
    const count = await counterService.getCountByName(name);
    return count;
  }

  async getCountImage(name: string, theme: string, length = 7) {
    const count = await this.getCountByName(name);
    const { themeList } = this;

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
