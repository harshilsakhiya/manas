import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Nav, Tab } from "react-bootstrap";
import '../App.css';
// import './src/App.css';
// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Page,
//   Selection,
//   Inject,
//   Edit,
//   Toolbar,
//   Sort,
//   Filter,
// } from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid, existingPortFolio, newPortFolio } from "../data/dummy";
import { Header } from "../components";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";

const Transactions = () => {
  // const selectionsettings = { persistSelection: true };
  // const toolbarOptions = ["Delete"];
  // const editing = { allowDeleting: true, allowEditing: true };
  const fields = { text: "name", value: "id" }
  const [screen, setScreen] = useState("initial");
  const [dropdown1Value, setDropdown1Value] = useState("");
  const [textboxValue, setTextboxValue] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState("");

  // useEffect(() => {
  //   updateSampleSection();
  // }, []);
  let uploadObj = useRef(null);
  let allowedExtensions;
  let dropContainerRef;
  let dropContainerEle;
  dropContainerEle = null;
  dropContainerRef = element => {
    dropContainerEle = element;
  };

  allowedExtensions = '.csv, .xls, .xlsx';

  const onFileSelected = (args) => {
    args.filesData.splice(5);
    let filesData = uploadObj.current.getFilesData();
    console.log({ filesData })
    let allFiles = filesData.concat(args.filesData);
    if (allFiles.length > 5) {
      for (let i = 0; i < allFiles.length; i++) {
        if (allFiles.length > 5) {
          allFiles.shift();
        }
      }
      args.filesData = allFiles;
      args.modifiedFilesData = args.filesData;
    }
    args.isModified = true;
    console.log({ args })
  };



  return (
    <div className="container">
      <Header category="" title="Upload Portfolio Data" />

      {screen === "initial" && (
        <div className="row  d-flex justify-center ">
          <div className="col-2"></div>

          <div
            className=" bg-light col-8  border border-dark rounded text-center p-5 "
            style={{ boxShadow: "0 5px 5px  #737373" }}
          >
            <form
              className="form d-flex flex-column"
              onSubmit={(e) => {
                e.preventDefault();
                setScreen("next");
              }}
            >
              <div className="form-group  mb-4 border">
                <DropDownListComponent id="existing-portfolio" dataSource={existingPortFolio} fields={fields} placeholder="Select Existing Portfolio" />

              </div>

              <div className="form-group mb-4">
                <DropDownListComponent id="existing-portfolio" dataSource={newPortFolio} fields={fields} placeholder="Add New Portfolio" />
              </div>

              <div className="form-group mb-4 ">
                <DropDownListComponent id="existing-portfolio" dataSource={newPortFolio} fields={fields} placeholder="Delete Selected Portfolio" />

              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block w-100 bg-primary "
                style={{ boxShadow: "0 3px 3px #737373", borderRadius: "8px" }}
              >
                Next
              </button>
            </form>
          </div>

          <div className="col-2"></div>
        </div>
      )}

      {screen === "next" && (
        <div className="d-flex justify-center ">
          <div
            className="Container p-5 bg-light border border-dark rounded text-center mt-3 mb-5"
            style={{ boxShadow: "0 5px 5px  #737373" }}
          >
            <div className="row d-flex justify-center ">
              <div className="mt-4">
                <Tab.Container defaultActiveKey="portfolio">
                  <Nav variant="pills" className="d-flex justify-content-between">
                    <Nav.Item className="mr-2">
                      <Nav.Link
                        eventKey="portfolio"
                        className=" nav-link-small font-weight-bold border"
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Portfolio Data
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mr-2">
                      <Nav.Link
                        eventKey="cashflow"
                        className=" nav-link-small font-weight-bold border "
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Cashflow Data
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mr-2">
                      <Nav.Link
                        eventKey="market"
                        className="nav-link-small font-weight-bold border  "
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Market Data
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mr-2">
                      <Nav.Link
                        eventKey="corporate"
                        className="nav-link-small font-weight-bold border "
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Corporate Action Data
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey="portfolio" className="">
                      {/* <h4 className="large my-4 "> Select Portfolio File</h4> */}
                      <div className='control-pane' ref={dropContainerRef}>
                        <div className='control-section col-lg-12 uploadpreview'>
                          <div className='upload_wrapper'>
                            <UploaderComponent id='validation' type='file' ref={uploadObj} selected={(args) => onFileSelected(args)} minFileSize={10000} autoUpload={false} allowedExtensions={allowedExtensions}></UploaderComponent>
                          </div>
                        </div>
                      </div>

                      <div className="btn-group my-4">
                        <button
                          type="button"
                          className="small text-dark btn btn-primary"
                          style={{ borderRadius: "8px" }}
                        >
                          Add Stock
                        </button>
                        <button
                          type="button "
                          className=" small text-dark btn btn-primary  mx-3"
                          style={{ borderRadius: "8px" }}
                        >
                          View Portfolio
                        </button>
                        <button
                          type="button"
                          className="small text-dark  btn btn-primary"
                          style={{ borderRadius: "8px" }}
                        >
                          Template.xls
                        </button>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="cashflow" className="">

                      <h4 className="large my-4 "> Select Cashflow File</h4>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input border "
                          id="customFile"
                        />
                      </div>

                      <div className="btn-group my-4">
                        <button
                          type="button"
                          className="small text-dark btn btn-primary"
                          style={{ borderRadius: "8px" }}
                        >
                          Add Stock
                        </button>
                        <button
                          type="button "
                          className=" small text-dark btn btn-primary  mx-3"
                          style={{ borderRadius: "8px" }}
                        >
                          View Cashflow
                        </button>
                        <button
                          type="button"
                          className="small text-dark  btn btn-primary"
                          style={{ borderRadius: "8px" }}
                        >
                          Template.xls
                        </button>
                      </div>

                    </Tab.Pane>
                    <Tab.Pane eventKey="market" className="">
                      <h4 className="large my-4 "> Select Closing Price File</h4>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input border "
                          id="customFile"
                        />
                      </div>

                      <div className="btn-group my-4">
                        <button
                          type="button"
                          className="small text-dark btn btn-primary"
                          style={{ borderRadius: "8px" }}
                        >
                          Add Closing File
                        </button>
                        <button
                          type="button "
                          className=" small text-dark btn btn-primary  mx-3"
                          style={{ borderRadius: "8px" }}
                        >
                          View Closing Price
                        </button>
                        <button
                          type="button"
                          className="small text-dark  btn btn-primary"
                          style={{ borderRadius: "8px" }}
                        >
                          Template.xls
                        </button>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="corporate" className="">
                      <h4 className="large my-4 "> Select Corporate Action File</h4>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input border "
                          id="customFile"
                        />
                      </div>

                      <div className="btn-group my-4">
                        <button
                          type="button"
                          className="small text-dark btn btn-primary"
                          style={{ borderRadius: "8px" }}
                        >
                          Add Corporate Action
                        </button>
                        <button
                          type="button "
                          className=" small text-dark btn btn-primary  mx-3"
                          style={{ borderRadius: "8px" }}
                        >
                          View Corporate Action
                        </button>
                        <button
                          type="button"
                          className="small text-dark  btn btn-primary"
                          style={{ borderRadius: "8px" }}
                        >
                          Template.xls
                        </button>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
