import HEADER_MAP from "../../constants/headerMap.js";

class HeaderMappingService {
  normalize(records) {
    return records.map((record) => {
      const normalizedRecord = {};

      Object.entries(record).forEach(([header, value]) => {
        const normalizedHeader = header.trim().toLowerCase();

        const canonicalField = Object.keys(HEADER_MAP).find((field) =>
          HEADER_MAP[field].includes(normalizedHeader)
        );

        if (canonicalField) {
          normalizedRecord[canonicalField] = value;
        }
      });

      return normalizedRecord;
    });
  }
}

export default new HeaderMappingService();