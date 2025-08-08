"use client";
import { Stack } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  createPayPalOrderForCourse,
  capturePayPalOrderForCourse,
  createPayPalOrderForBundle,
  capturePayPalOrderForBundle,
} from "@/app/actions/course";
import { useRouter } from "next/navigation";

export default function PayPalCourse({
  course,
  bundle,
  setIsSummaryOpen,
  selectedPackage,
}: any) {
  const router = useRouter();

  const initialOptions = {
    clientId:
      "ATz11Ut9xSS6NRAqX16Rblc8okk2dzx4HEcWD9VY7xQ1JYbFUEeD9o-1mz6sPl5z88gjLY2mNwhQDLSE",
  };

  return (
    <Stack direction={"column"} spacing={"32px"} width={"100%"}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          onApprove={async (data, actions) => {
            const orderId = data.orderID;
            const response = selectedPackage
              ? await capturePayPalOrderForBundle(orderId)
              : await capturePayPalOrderForCourse(orderId);
            const errorDetail = response?.details?.[0];
            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
              return actions.restart();
            } else if (errorDetail) {
              setIsSummaryOpen && setIsSummaryOpen(true);
            } else {
              router.push("/learning");
            }
          }}
          createOrder={async () => {
            setIsSummaryOpen && setIsSummaryOpen(false);
            const response = selectedPackage
              ? await createPayPalOrderForBundle(bundle.slug)
              : await createPayPalOrderForCourse(course.slug);
            return response.id;
          }}
        />
      </PayPalScriptProvider>
    </Stack>
  );
}
