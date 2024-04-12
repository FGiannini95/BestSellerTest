import React from "react";
import "./tableApp.scss";
import { AccordionApp } from "../AccordionApp/AccordionApp";
import axios from "axios";
import { CharacterData, InfoCharacter } from "../../App";

interface TableAppProps {
  findData: CharacterData[];
  info: InfoCharacter;
  search: string;
  setData: React.Dispatch<React.SetStateAction<CharacterData[]>>;
  setInfo: React.Dispatch<React.SetStateAction<InfoCharacter>>;
}

export const TableApp = ({
  setData,
  findData,
  info,
  setInfo,
  search,
}: TableAppProps) => {

  const chargeMore = (url: string) => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data.results);
        setInfo(res.data.info);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="custom-table-container">
      <h2>All the characteres
      </h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Current Status</th>
            <th>Species</th>
            <th>Location</th>
            <th>Episodes</th>
          </tr>
        </thead>
        <tbody>
          {findData?.map((elem, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{elem.name}</td>
                <td>{elem.gender}</td>
                <td>{elem.status}</td>
                <td>{elem.species}</td>
                <td>{elem.location?.name}</td>
                <td>{elem.episode?.length}</td>
              </tr>
              <tr>
                <AccordionApp elem={elem} index={index} colSpan={6} />
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {search === "" && (
        <div className="d-flex justify-content-center pagination-container">
          <div>
            {info?.prev && (
              <button onClick={() => chargeMore(info.prev)}>⟪</button>
            )}
          </div>
          <div>
            {info?.next && (
              <button onClick={() => chargeMore(info.next)}>⟫</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};