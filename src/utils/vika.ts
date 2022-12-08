import { Vika } from "@vikadata/vika";

class VikaUtils {
  vika: Vika;
  constructor() {
    this.vika = new Vika({ token: "usk0R9kWavBMYfqp5Oyalzx" });
  }

  getVikaConn() {
    return this.vika;
  }

  getVikaMoeDataBase() {
    return this.vika.datasheet("dst7lKvY4d02YPRsBY");
  }
}

export default new VikaUtils();
