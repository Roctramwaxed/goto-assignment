/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  ListGroup,
  Collapse,
  InputGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import NameCard from "../../components/name-card";

import { displayContacts } from "../../helpers";
import { Link } from "react-router-dom";

const ListPage = () => {
  const [favOpen, setFavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(
    JSON.parse(localStorage.getItem("users") || "[]").length / 10 || 1
  );
  const [favUsers, setFavUsers] = useState([
    {
      id: -1,
      name: "",
      phone: [""],
    },
  ]);
  const [users, setUsers] = useState([
    {
      id: 0,
      name: "",
      phone: [""],
    },
  ]);

  const handleSearch = () => {
    const newUsers = JSON.parse(localStorage.getItem("users") || "[]").filter(
      (e = { name: "" }) => e.name.includes(searchQuery)
    );
  };

  const handlePaging = (nextPressed = true) => {
    let newPage = page;
    if (nextPressed) newPage += 1;
    else newPage -= 1;
    setPage(newPage);

    const offset = (newPage - 1) * 10;

    const newUsers = JSON.parse(localStorage.getItem("users") || "[]")?.slice(
      offset,
      offset + 10
    );

    setUsers(newUsers);
  };

  const handleFav = (
    user = {
      id: 0,
      name: "",
      phone: "",
    },
    fav = false
  ) => {
    if (!fav) {
      let newFavUsers = JSON.parse(localStorage.getItem("fav") || "[]");
      newFavUsers.push(user);
      newFavUsers.sort((a = { id: -1 }, b = { id: -1 }) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      localStorage.setItem("fav", JSON.stringify(newFavUsers));

      let newUsers = JSON.parse(localStorage.getItem("users") || "[]").filter(
        (e = { id: -1 }) => e.id !== user.id
      );
      localStorage.setItem("users", JSON.stringify(newUsers));
    } else {
      let newUsers = JSON.parse(localStorage.getItem("users") || "[]");
      newUsers.push(user);
      newUsers.sort((a = { id: -1 }, b = { id: -1 }) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      localStorage.setItem("users", JSON.stringify(newUsers));

      let newFavUsers = JSON.parse(localStorage.getItem("fav") || "[]").filter(
        (e = { id: -1 }) => e.id !== user.id
      );
      localStorage.setItem("fav", JSON.stringify(newFavUsers));
    }
    dispatchEvent(new Event("storage"));
  };

  const handleDeleteUsers = (id = -1) => {
    let newUsers = JSON.parse(localStorage.getItem("users") || "[]");
    newUsers = newUsers.filter((e = { id: -1 }) => e.id !== id);
    console.log(newUsers, 'hoihoi')
    localStorage.setItem("users", JSON.stringify(newUsers));
    dispatchEvent(new Event('storage'))
  };

  const handleDeleteFav = (id = -1) => {
    let newUsers = JSON.parse(localStorage.getItem("fav") || "[]");
    newUsers = newUsers.filter((e = { id: -1 }) => e.id !== id);
    localStorage.setItem("fav", JSON.stringify(newUsers));
    dispatchEvent(new Event('storage'))
  };

  useEffect(() => {
    if (localStorage.getItem("users")) {
      console.log("users already fetched.");
      setUsers(JSON.parse(localStorage.getItem("users") || "[]").slice(0, 10));
      setFavUsers(JSON.parse(localStorage.getItem("fav") || "[]"));
    } else {
      displayContacts();
      setTimeout(() => {
        setUsers(
          JSON.parse(localStorage.getItem("users") || "[]").slice(0, 10)
        );
      }, 2000);
    }

    window.addEventListener("storage", () => {
      setUsers(JSON.parse(localStorage.getItem("users") || "[]")?.slice(0, 10));
      setFavUsers(JSON.parse(localStorage.getItem("fav") || "[]"));
      setPage(1)
    });
  }, []);

  return (
    <Card css={style}>
      <Card.Header css={styleHeader}>
        <div css={invisBox} />
        <h1 className="m-0">CONTACTS</h1>
        <Link to={"/form"}>
          <Button variant="success">+</Button>
        </Link>
      </Card.Header>
      <Card.Body css={styleBody}>
        <h5 onClick={() => setFavOpen(!favOpen)}>
          <FontAwesomeIcon icon={faStar} css={starIconStyle} />
          <span>FAVORITES</span>
          <FontAwesomeIcon
            icon={favOpen ? faCaretUp : faCaretDown}
            css={dropdownIconStyle}
          />
        </h5>
        <Collapse in={favOpen && favUsers.length > 0 && favUsers[0].id !== -1}>
          <ListGroup>
            {favUsers?.map(
              (
                u = {
                  id: 0,
                  name: "",
                  phone: [""],
                }
              ) => {
                return (
                  <NameCard
                    key={u.id}
                    id={u.id}
                    name={`${u.name}`}
                    phone={u.phone}
                    fav={true}
                    handleFav={handleFav}
                    handleDelete={handleDeleteFav}
                  />
                );
              }
            )}
          </ListGroup>
        </Collapse>

        <InputGroup className="mt-2">
          <Form.Control
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>

        <ListGroup variant="flush">
          {users?.map(
            (
              u = {
                id: 0,
                name: "",
                phone: [""],
              }
            ) => {
              return (
                <NameCard
                  key={u.id}
                  id={u.id}
                  name={`${u.name}`}
                  phone={u.phone}
                  fav={false}
                  handleFav={handleFav}
                  handleDelete={handleDeleteUsers}
                />
              );
            }
          )}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Row css={styleFooter}>
          <Col className="col-4">
            {page > 1 && (
              <Button onClick={() => handlePaging(false)}>{`< Prev`}</Button>
            )}
          </Col>
          <Col className="col-4">
            <span>
              {page} of {totalPage}
            </span>
          </Col>
          <Col className="col-4">
            {page < totalPage && (
              <Button onClick={() => handlePaging(true)}>{`Next >`}</Button>
            )}
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

const starIconStyle = css`
  color: #afa90e;
  margin-right: 5px;
`;

const dropdownIconStyle = css`
  margin-left: 5px;
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
  justify-content: space-between;
  align-items: center;

  h1 {
    font-weight: 800;
  }
`;

const style = css`
  height: 100%;
`;

export default ListPage;
