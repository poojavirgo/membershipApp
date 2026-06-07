import type { MemberType } from "../../../../types";
import { formatPrice } from "../../../../utils";
import { REGISTRATION as Txt } from "../../../../constants";
import { Step, Card, RadioButton, FieldError } from "../../../../common";
import styles from "./MemberTypeStep.module.css";

export interface MemberTypeStepProps {
  title: string;
  description: string;
  memberTypes: MemberType[];
  selectedId: string | null;
  error?: string | null;
  onSelect: (id: string) => void;
}

export const MemberTypeStep = ({
  title,
  description,
  memberTypes,
  selectedId,
  error,
  onSelect,
}: MemberTypeStepProps) => {
  return (
    <Step title={title} description={description}>
      <h3 className={styles.heading}>{Txt.memberType.heading}</h3>

      <div
        className={styles.list}
        role="radiogroup"
        aria-label={Txt.memberType.ariaLabel}
      >
        {memberTypes.map((type) => {
          const selected = type.id === selectedId;
          return (
            <Card
              key={type.id}
              selected={selected}
              onClick={() => onSelect(type.id)}
            >
              <RadioButton checked={selected} label={type.name} />
              <span className={styles.body}>
                <span className={styles.name}>{type.name}</span>
                {type.description && (
                  <span className={styles.desc}>{type.description}</span>
                )}
              </span>
              <span className={styles.price}>
                {formatPrice(type.price, type.currency)}
              </span>
            </Card>
          );
        })}
      </div>
      <FieldError message={error} />
    </Step>
  );
};
