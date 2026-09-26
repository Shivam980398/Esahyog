const DepartmentMainGrid = ({ citizenColumn, operatorColumn }) => {
  const CitizenColumn = citizenColumn;
  const OperatorColumn = operatorColumn;

  return (
    <section className="px-8 py-6 bg-slate-900/70 grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
      <CitizenColumn />
      <OperatorColumn />
    </section>
  );
};

export default DepartmentMainGrid;
