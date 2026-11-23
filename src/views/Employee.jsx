import "./Employee.css";

export const employeeAccount = {
  email: "employee@autokorjaamo.fi",
  password: "Employee123!",
  role: "employee",
  name: "Alex Morgan",
  position: "Service technician",
};

const Employee = () => {
  return (
    <main className="employee-page">
      <h1>Employee page</h1>
      <p className="employee-welcome">Welcome, {employeeAccount.name}.</p>
      <div className="employee-work-list">
        <section className="employee-work-card" aria-labelledby="upcoming-title">
          <h2 id="upcoming-title">Upcoming</h2>
          <p>No upcoming work scheduled.</p>
        </section>
        <section className="employee-work-card" aria-labelledby="ongoing-title">
          <h2 id="ongoing-title">Ongoing</h2>
          <p>No ongoing work.</p>
        </section>
        <section className="employee-work-card" aria-labelledby="completed-title">
          <h2 id="completed-title">Completed</h2>
          <p>No completed work yet.</p>
        </section>
      </div>
    </main>
  );
};

export default Employee;