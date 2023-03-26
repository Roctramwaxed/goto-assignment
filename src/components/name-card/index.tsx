/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Col, Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid, faX } from "@fortawesome/free-solid-svg-icons";

interface NameCardProps {
  id: number;
  name: string;
  phone: Array<string>;
  fav: boolean;
  handleFav: (params: any, fav: any) => any;
  handleDelete: (params: any) => any;
}

const NameCard = ({
  id = 0,
  name = "",
  phone = [""],
  fav = false,
  handleFav,
  handleDelete,
}: NameCardProps) => {
  return (
    <ListGroup.Item css={itemStyle}>
      <div className="info">
        <h6>{name}</h6>
        {phone.map((e) => {
          return <span key={e}>{e}</span>;
        })}
      </div>
      <div>
        {fav ? (
          <FontAwesomeIcon
            icon={faStarSolid}
            css={starIconStyle}
            onClick={() =>
              handleFav(
                {
                  id,
                  name,
                  phone,
                },
                fav
              )
            }
          />
        ) : (
          <FontAwesomeIcon
            icon={faStarReg}
            css={starIconStyle}
            onClick={() =>
              handleFav(
                {
                  id,
                  name,
                  phone,
                },
                fav
              )
            }
          />
        )}
        <FontAwesomeIcon
          icon={faX}
          css={crossIconStyle}
          onClick={() => handleDelete(id)}
        />
      </div>
    </ListGroup.Item>
  );
};

const crossIconStyle = css`
  color: red;
  margin-left: 10px;
`;

const starIconStyle = css`
  color: #afa90e;
`;

const itemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h6 {
    font-weight: bold;
    margin-bottom: 0;
  }

  span {
    font-size: smaller;
  }

  .info {
    display: flex;
    flex-direction: column;
  }
`;

export default NameCard;
