import vikaUtils from "../utils/vika";
class CounterService {
  async getCountByName(name: string) {
    const datasheet = vikaUtils.getVikaMoeDataBase();
    const response = await datasheet.records.query({
      viewId: "viwlZomyVNYLD",
      filterByFormula: `find("${name}", {name})`,
    });

    if (response.success) {
      if (response.data.records.length !== 0) {
        const record = response.data.records[0];
        const count = record.fields.count as number;
        const countRes = await datasheet.records.update([
          {
            recordId: record.recordId,
            fields: {
              count: count + 1,
            },
          },
        ]);
        return countRes.data?.records[0].fields.count as number;
      } else {
        const updateRes = await datasheet.records.create([
          {
            fields: {
              name,
              count: 1,
            },
          },
        ]);
        return updateRes.data?.records[0].fields.count as number;
      }
    }
    return 0;
  }
}

export default new CounterService();
