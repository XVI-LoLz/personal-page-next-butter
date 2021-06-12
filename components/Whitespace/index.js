import PropTypes from "prop-types";

export default function Whitespace({ width, height }) {
  return <div className="whitespace" style={{ width, height }} />;
}

Whitespace.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Whitespace.defaultProps = {
  width: "100%",
  height: "50vh",
};
