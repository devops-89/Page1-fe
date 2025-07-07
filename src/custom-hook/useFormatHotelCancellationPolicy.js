import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// extend Day.js with the plugin
dayjs.extend(customParseFormat);

export const useFormatCancellationPolicy = (policies = []) => {
  return policies.map((policy) => {
    const readableDate = dayjs(policy.FromDate, "DD-MM-YYYY HH:mm:ss").format("DD MMM YYYY");

    if (policy.CancellationCharge === 0) {
      return `Free cancellation until ${readableDate}`;
    } else if (policy.ChargeType === "Percentage") {
      return `From ${readableDate}, ${policy.CancellationCharge}% cancellation fee applies`;
    } else if (policy.ChargeType === "Fixed") {
      return `From ${readableDate}, ₹${policy.CancellationCharge} cancellation fee applies`;
    } else {
      return `From ${readableDate}, cancellation charges may apply`;
    }
  });
};
