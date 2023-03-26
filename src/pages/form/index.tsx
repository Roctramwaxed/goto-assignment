/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Card, Button, Form as FormRB, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQueryParams } from "../../helpers";

const Form = ({}) => {
  const queryParams = useQueryParams();
  const [name, setName] = useState("");
  const [numbers, setNumbers] = useState([""]);

  const handleNameChange = (e = { target: { value: "" } }) => {
    if (e.target.value.match(/[^A-Za-z0-9]/g)) return;

    setName(e.target.value);
  };

  const handleChangeNumber = (i = -1, { target: { value = "" } }) => {
    if (!value.match(/[^0-9]/g) || value === "") {
      const newNumbers = [...numbers];
      if (i > -1) {
        newNumbers[i] = value;
        setNumbers(newNumbers);
      }
    }
  };

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("users") || "");
    const newUser = {
      id: users[users.length - 1].id + 1,
      name,
      phone: numbers,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    dispatchEvent(new Event("storage"));
  };

  useEffect(() => {}, []);

  return (
    <Card css={style}>
      <Card.Header css={styleHeader}>
        <h1 className="m-0">CONTACT FORM</h1>
      </Card.Header>
      <Card.Body css={styleBody}>
        <FormRB>
          <FormRB.Group>
            <FormRB.Label>Name</FormRB.Label>
            <FormRB.Control
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </FormRB.Group>
          {numbers.map((e, i) => {
            return (
              <FormRB.Group className="mt-3" key={i}>
                <FormRB.Label>Number</FormRB.Label>
                <InputGroup>
                  <InputGroup.Text>+</InputGroup.Text>
                  <FormRB.Control
                    type="number"
                    value={e}
                    onChange={(e) => {
                      handleChangeNumber(i, e);
                    }}
                  />
                </InputGroup>
              </FormRB.Group>
            );
          })}
          <Button
            variant="dark"
            css={addNumberStyle}
            onClick={() => setNumbers([...numbers, ""])}
          >
            Add Number
          </Button>
        </FormRB>
      </Card.Body>
      <Card.Footer css={styleFooter}>
        <Link to={"/"}>
          <Button variant="danger">Cancel</Button>
        </Link>
        <Link to={"/"} onClick={handleSubmit}>
          <Button variant="primary">Submit</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

const addNumberStyle = css`
  margin-top: 1rem;
  width: 100%;
`;

const invisBox = css`
  width: 37px;
`;

const styleFooter = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const styleBody = css`
  text-align: left;
  overflow: scroll;
  padding-bottom: 0;
`;

const styleHeader = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 800;
  }
`;

const style = css`
  height: 100%;
`;

export default Form;
