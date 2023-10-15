import { Form, useFormik } from "formik";

const PropertyForm = ({ intialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: intialValues,
    onSubmit: onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PropertyForm;
