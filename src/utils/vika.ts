import { Vika } from "@vikadata/vika";

const VIKA_TOKEN = process.env.VIKA_TOKEN || "";

class VikaUtils {
  vika: Vika;
  constructor() {
    this.vika = new Vika({ token: VIKA_TOKEN });
  }

  getVikaConn() {
    return this.vika;
  }

  getVikaMoeDataBase() {
    return this.vika.datasheet("dst7lKvY4d02YPRsBY");
  }
}

export default new VikaUtils();
