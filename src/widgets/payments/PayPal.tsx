"use client";

import { Stack } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { capturePaypalOrder, createPayPalOrder } from "@/app/actions/session";
import { useRouter } from "next/navigation";

export const PayPal = ({
  sessionId,
  setIsSummaryOpen,
}: {
  sessionId: string;
  setIsSummaryOpen: (isSummaryOpen: boolean) => void;
}) => {
  const router = useRouter();

  const initialOptions = {
    clientId:
      "AW-6FKagqGdYC1cmVt8_btplikfiD1IeN2N-GObxT4pnZV4DUbWI6YPlywYXm99Rhi-D5RZEJUu2WPix",
    enableFunding: "venmo",
    disableFunding: "",
    buyerCountry: "US",
    currency: "USD",
    dataPageType: "product-details",
    components: "buttons",
    dataSdkIntegrationSource: "developer-studio",
  };

  return (
    <Stack direction={"column"} spacing={"32px"} width={"100%"}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          onApprove={async (data, actions) => {
            const orderId = data.orderID;
            const response = await capturePaypalOrder(orderId);
            const errorDetail = response?.details?.[0];
            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
              return actions.restart();
            } else if (errorDetail) {
              setIsSummaryOpen(true);
            } else {
              router.push("/sessions?payment_success=true");
            }
          }}
          createOrder={async () => {
            setIsSummaryOpen(false);
            const response = await createPayPalOrder(sessionId);
            return response.id;
          }}
        />
      </PayPalScriptProvider>
    </Stack>
  );
};
