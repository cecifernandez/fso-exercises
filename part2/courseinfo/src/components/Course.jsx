const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        <Part
          name={parts.map((part) => (
            <li key={part.id}>
              {part.name}: {part.exercises}
            </li>
          ))}
        />
      </ul>
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <h1>
      Total of{" "}
      {parts.reduce((acc, total) => {
        return acc + total.exercises;
      }, 0)}{" "}
      exercises
    </h1>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
