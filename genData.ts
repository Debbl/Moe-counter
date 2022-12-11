import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import mimeType from "mime-types";

interface ThemeListType {
  [key: string]: Record<string, { width?: number; height?: number; data: any }>;
}

const themePath = "./assets/theme";
const dataPath = "./src/data";

function convertToDatauri(path: string) {
  const mime = mimeType.lookup(path);
  const base64 = fs.readFileSync(path).toString("base64");

  return `data:${mime};base64,${base64}`;
}

function genThemeList() {
  const themeList: ThemeListType = {};
  fs.readdirSync(themePath).forEach((theme) => {
    if (!(theme in themeList)) themeList[theme] = {};
    const imgList = fs.readdirSync(path.resolve(themePath, theme));
    imgList.forEach((img) => {
      const imgPath = path.resolve(themePath, theme, img);
      const name = path.parse(img).name;
      const { width, height } = sizeOf(imgPath);
      themeList[theme][name] = {
        width,
        height,
        data: convertToDatauri(imgPath),
      };
    });
  });
  console.log(themeList);
  const content = `
  export default function getThemeList() {
    return ${JSON.stringify(themeList)};
  }
  `;
  fs.writeFileSync(`${dataPath}/getThemeList.ts`, content);
  return themeList;
}

genThemeList();
