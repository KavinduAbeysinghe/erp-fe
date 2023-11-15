import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { FormTextField } from "../../../components/inputs/FormTextField";
import DenseTable from "../../../components/tables/DenseTable";
import { useNotification } from "../../../contexts/NotificationContext";
import { useFieldArray } from "react-hook-form";
import { CustomButton } from "../../../components/buttons/CustomButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface CustomizedAccordionProps {
  options: Array<{ title: string; body: any }>;
}

interface KpiTypeProps {
  title: string;
  register: any;
  index: number;
  watch: any;
  control: any;
  setValue: any;
}

export const KpiType = ({
  title,
  index,
  register,
  watch,
  control,
  setValue,
}: KpiTypeProps) => {
  const notify = useNotification();

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [denseTableData, setDenseTableData] = React.useState<Array<any>>([]);

  const kpiType = watch(`kpiTypeList.${index}.kpiType`);

  const { fields, prepend, remove } = useFieldArray({
    name: `kpiTypeList.${index}.subList`,
    control,
  });

  const handleAddKpiType = () => {
    if (!!kpiType) {
      const dupKpiType = fields?.find((d: any) => d?.kpiType === kpiType);
      if (!dupKpiType) {
        prepend({
          kpiType: kpiType,
        });
        setValue(`kpiTypeList.${index}.kpiType`, "");
      } else {
        setValue(`kpiTypeList.${index}.kpiType`, "");
        notify.warn("Already exists");
      }
    } else {
      return;
    }
  };

  React.useEffect(() => {
    console.log(fields);

    setDenseTableData(
      fields?.map((d: any, index) => ({
        id: d?.id,
        no: index + 1,
        name: d?.kpiType,
      }))
    );
  }, [fields]);

  const handleRemove = (id: any) => {
    remove(fields?.indexOf(id));
  };

  const actionButtons = [
    { tooltip: "View", icon: faTrash, handleClick: handleRemove },
  ];

  return (
    <Accordion
      expanded={expanded === `panel${index + 1}`}
      onChange={handleChange(`panel${index + 1}`)}
    >
      <AccordionSummary
        aria-controls={`panel${index + 1}d-content`}
        id={`panel${index + 1}d-header`}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <FormTextField
              register={register(`kpiTypeList.${index}.kpiType`)}
              label={"KPI Type"}
              disabled={false}
              required={true}
              error={false}
              helperText={""}
            />
          </Grid>
          <Grid item md={2}>
            <CustomButton
              text={"+ Add"}
              variant="outlined"
              onClick={handleAddKpiType}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <DenseTable
              tableData={denseTableData}
              tableHeaders={["No", "Name"]}
              actionButtons={actionButtons}
              id={"id"}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
