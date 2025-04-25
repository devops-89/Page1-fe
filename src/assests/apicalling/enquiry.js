import { authenticationController } from "@/api/auth";
import { setToast } from "@/redux/reducers/toast";
import { TOAST_STATUS } from "@/utils/enum";

export const userSendEnquiry = ({ setLoading, data, dispatch }) => {
  authenticationController
    .sendEnquiry(data)
    .then((res) => {
      console.log("Res", res);
      dispatch(
        setToast({
          open: true,
          message: "Enquiry Send Successful",
          severity: TOAST_STATUS.SUCCESS,
        })
      );
      setLoading(false);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
