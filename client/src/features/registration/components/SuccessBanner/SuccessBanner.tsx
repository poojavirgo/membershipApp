import { Banner, Button } from "../../../../common";
import { REGISTRATION as Txt } from "../../../../constants";
import { interpolate } from "../../../../utils";

export interface SuccessBannerProps {
  firstName: string;
  memberTypeName: string;
  email: string;
  onReset: () => void;
}

export const SuccessBanner = ({
  firstName,
  memberTypeName,
  email,
  onReset,
}: SuccessBannerProps) => {
  return (
    <Banner variant="success" title={Txt.success.title}>
      {interpolate(Txt.success.body, {
        name: firstName,
        type: memberTypeName,
        email,
      })}
      <div style={{ marginTop: 20 }}>
        <Button onClick={onReset}>{Txt.success.again}</Button>
      </div>
    </Banner>
  );
};
