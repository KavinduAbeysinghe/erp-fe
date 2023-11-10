import CustomAccordion from "../../components/accordions/CustomAccordion";
import CustomizedAccordions from "../../components/accordions/CustomAccordion";
import DenseTable from "../../components/tables/DenseTable";
import { FormTextField } from "../../components/inputs/FormTextField";

export const ViewEvaluation = () => {
  const tableHeads = ["#", "Name", "Rating", "Comments"];

  const tableData = [
    {
      no: 1,
      name: "Sample Name 001",
      rating: (
        <FormTextField register={undefined} type={"number"} fullWidth={false} />
      ),
      comments: <FormTextField register={undefined} type={"text"} />,
    },
    {
      no: 1,
      name: "Sample Name 002",
      rating: <FormTextField register={undefined} type={"number"} />,
      comments: <FormTextField register={undefined} type={"text"} />,
    },
    {
      no: 1,
      name: "Sample Name 003",
      rating: <FormTextField register={undefined} type={"number"} />,
      comments: <FormTextField register={undefined} type={"text"} />,
    },
    {
      no: 1,
      name: "Sample Name 004",
      rating: <FormTextField register={undefined} type={"number"} />,
      comments: <FormTextField register={undefined} type={"text"} />,
    },
    {
      no: 1,
      name: "Sample Name 005",
      rating: <FormTextField register={undefined} type={"number"} />,
      comments: <FormTextField register={undefined} type={"text"} />,
    },
  ];

  const accordionOptions = [
    {
      title: "Development KPI - 5 November 2023",
      body: <DenseTable tableData={tableData} tableHeaders={tableHeads} />,
    },
    {
      title: "Non-Development KPI - 5 November 2023",
      body: <DenseTable tableData={tableData} tableHeaders={tableHeads} />,
    },
    {
      title: "Other - 5 November 2023",
      body: <DenseTable tableData={tableData} tableHeaders={tableHeads} />,
    },
  ];

  return (
    <div>
      <CustomizedAccordions options={accordionOptions} />
    </div>
  );
};
