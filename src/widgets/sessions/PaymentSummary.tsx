"use client";

import { Box, Collapse, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { PayPal } from "@/widgets/payments/PayPal";
import { useEffect, useState } from "react";
import { SessionPackageCheckout } from "@/models/session";
import { getSessionPackageCheckout } from "@/app/actions/session";

type PaymentSummaryProps = {
  sessionPackageId: string;
};

export const PaymentSummary = ({ sessionPackageId }: PaymentSummaryProps) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [sessionPackageCheckout, setSessionPackageCheckout] =
    useState<SessionPackageCheckout>();

  const fetchSessionPackageCheckout = async () => {
    const sessionPackageCheckout = await getSessionPackageCheckout(
      sessionPackageId
    );
    setSessionPackageCheckout(sessionPackageCheckout);
  };

  useEffect(() => {
    fetchSessionPackageCheckout();
  }, [sessionPackageId]);

  if (!sessionPackageCheckout) return null;

  const totalPrice =
    sessionPackageCheckout.per_session_price *
    sessionPackageCheckout.num_sessions;
  const discount =
    ((totalPrice - sessionPackageCheckout.price) / totalPrice) * 100;
  const discountAmount = totalPrice - sessionPackageCheckout.price;

  return (
    <Stack
      direction={"column"}
      spacing={"30px"}
      height={"100%"}
      width={"100%"}
      justifyContent={"center"}
    >
      <Typography variant={"h4"} color={"primary.main"}>
        Payment Summary
      </Typography>
      <Stack direction={"column"} spacing={"25px"}>
        <Collapse in={isSummaryOpen}>
          <Stack direction={"column"} spacing={"25px"}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction={"row"} spacing={"16px"} alignItems={"center"}>
                <Stack direction={"column"} spacing={"2px"}>
                  <Typography variant={"h5"} color={"primary.main"}>
                    {sessionPackageCheckout.title}
                  </Typography>
                  <Typography variant={"body2"}>
                    Sessions: {sessionPackageCheckout.num_sessions}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction={"column"}
                spacing={"2px"}
                justifyContent={"flex-end"}
              >
                <Typography
                  variant={"body2"}
                  fontFamily={"monospace"}
                  color={"primary.main"}
                >
                  ${sessionPackageCheckout.per_session_price}
                </Typography>
                <Stack
                  direction={"row"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  spacing={"2px"}
                >
                  <Box
                    sx={{
                      width: "10px",
                      height: "1px",
                      borderBottom: "1px dashed #323232",
                    }}
                  ></Box>
                  <Typography variant={"body2"}>x</Typography>
                  <Typography variant={"body2"} fontFamily={"monospace"}>
                    {sessionPackageCheckout.num_sessions}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Divider flexItem />
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant={"body2"} color={"primary.main"}>
                Subtotal
              </Typography>
              <Typography
                variant={"body2"}
                sx={{ fontFamily: "monospace" }}
                color={"primary.main"}
              >
                ${totalPrice}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack
                direction={"row"}
                spacing={"16px"}
                p={"12px"}
                sx={{ backgroundColor: "divider", borderRadius: "5px" }}
              >
                <Image
                  src={"/tag.svg"}
                  alt={"discount"}
                  width={24}
                  height={24}
                />
                <Typography variant={"body2"} color={"primary.main"}>
                  SAVE {discount}%
                </Typography>
              </Stack>
              <Typography variant={"body2"} sx={{ fontFamily: "monospace" }}>
                - ${discountAmount}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant={"body2"} color={"primary.main"}>
                Tax
              </Typography>
              <Typography variant={"body2"}>---</Typography>
            </Stack>
            <Divider flexItem />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant={"h5"} color={"primary.main"}>
                Total
              </Typography>
              <Typography
                variant={"h5"}
                sx={{ fontFamily: "monospace" }}
                color={"primary.main"}
              >
                ${sessionPackageCheckout.price}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
        <PayPal
          isSummaryOpen={isSummaryOpen}
          sessionId={sessionPackageId}
          setIsSummaryOpen={setIsSummaryOpen}
        />
      </Stack>
    </Stack>
  );
};
