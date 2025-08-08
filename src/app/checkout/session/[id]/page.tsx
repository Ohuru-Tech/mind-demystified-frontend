import { Grid } from "@mui/material";
import { PaymentSummary } from "@/widgets/sessions/PaymentSummary";
import { BookingSummary } from "@/widgets/sessions/BookingSummary";

// Add revalidation for checkout page - 60 seconds
export const revalidate = 60;

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Grid
      container
      spacing={"52px"}
      justifyContent={"center"}
      margin={0}
      sx={{ minHeight: "99vh" }}
    >
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          paddingLeft: "40px",
          height: "99vh",
          paddingRight: "52px",
          position: "sticky",
          top: 0,
        }}
      >
        <BookingSummary sessionId={id as string} />
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          backgroundColor: "white",
          borderTopLeftRadius: "12px",
          borderBottomLeftRadius: "12px",
          paddingRight: "52px",
          paddingLeft: "40px",
          filter: "drop-shadow(0px 9px 52px rgba(0, 0, 0, 0.1))",
        }}
      >
        <PaymentSummary sessionPackageId={id as string} />
      </Grid>
    </Grid>
  );
}
