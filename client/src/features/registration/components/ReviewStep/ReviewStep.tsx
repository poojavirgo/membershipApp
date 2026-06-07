import type { MemberType, RegistrantInfo } from "../../../../types";
import { formatPrice, formatDate } from "../../../../utils";
import { REGISTRATION as Txt } from "../../../../constants";
import { Step, List, Row, FieldError } from "../../../../common";

export interface ReviewStepProps {
  memberType: MemberType;
  registrant: RegistrantInfo;
  error?: string | null;
}

export const ReviewStep = ({
  memberType,
  registrant,
  error,
}: ReviewStepProps) => {
  const rows = [
    { label: Txt.review.membership, value: memberType.name },
    {
      label: Txt.review.price,
      value: formatPrice(memberType.price, memberType.currency),
    },
    {
      label: Txt.review.name,
      value: `${registrant.firstName} ${registrant.lastName}`,
    },
    { label: Txt.review.email, value: registrant.email },
    { label: Txt.review.phone, value: registrant.phone },
    { label: Txt.review.birthDate, value: formatDate(registrant.birthDate) },
  ];

  return (
    <Step title={Txt.review.title}>
      <List>
        {rows.map((row) => (
          <Row key={row.label} label={row.label} value={row.value} />
        ))}
      </List>

      <FieldError message={error} />
    </Step>
  );
};
