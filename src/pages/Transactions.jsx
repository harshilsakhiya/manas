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

import { customersData, customersGrid, existingPortFolio, newPortFolio, portFolioData } from "../data/dummy";
import { Header } from "../components";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const Transactions = () => {
  // const selectionsettings = { persistSelection: true };
  // const toolbarOptions = ["Delete"];
  // const editing = { allowDeleting: true, allowEditing: true };
  const fields = { text: "name", value: "id" }
  const [screen, setScreen] = useState("initial");
  const [dropdown1Value, setDropdown1Value] = useState("");
  const [textboxValue, setTextboxValue] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState("");
  const [activeKey, setActiveKey] = useState("portfolio")
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState(1);

  console.log(activeTab)

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

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
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

              <ButtonComponent cssClass='e-info' className="!capitalize" type="submit" style={{ boxShadow: "0 3px 3px #737373" }}>Next</ButtonComponent>
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
                <Tab.Container defaultActiveKey={activeKey}>
                  <Nav variant="pills" className="d-flex justify-content-between">
                    <Nav.Item className="mr-2">
                      <Nav.Link
                        active={activeTab === 1}
                        onClick={() => toggleTab(1)}
                        eventKey="portfolio"
                        className=" nav-link-small font-weight-bold border"
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Portfolio Data
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mr-2">
                      <Nav.Link
                        active={activeTab === 2}
                        onClick={() => toggleTab(2)}
                        eventKey="cashflow"
                        className=" nav-link-small font-weight-bold border "
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Cashflow Data
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mr-2">
                      <Nav.Link
                        active={activeTab === 3}
                        onClick={() => toggleTab(3)}
                        eventKey="market"
                        className="nav-link-small font-weight-bold border  "
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Market Data
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mr-2">
                      <Nav.Link
                        active={activeTab === 4}
                        onClick={() => toggleTab(4)}
                        eventKey="corporate"
                        className="nav-link-small font-weight-bold border "
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Corporate Action Data
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content activeTab={activeTab}>

                    <Tab.Pane eventKey="portfolio" tabIndex={1}>
                      <div className="d-flex justify-end mt-2">
                        <a href={portFolioData.portfolio} target="_blank" download>
                          <ButtonComponent cssClass='e-info' className="!capitalize" >Download</ButtonComponent>
                        </a>
                      </div>
                      <div className='control-pane mt-4' ref={dropContainerRef}>
                        <div className='control-section col-lg-12 uploadpreview p-0 '>
                          <div className='upload_wrapper'>
                            <UploaderComponent id='validation' type='file' ref={uploadObj} selected={(args) => onFileSelected(args)} minFileSize={10000} autoUpload={false} allowedExtensions={allowedExtensions}></UploaderComponent>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="cashflow" tabIndex={2}>
                      <div className="d-flex justify-end mt-2">
                        <a href={portFolioData.cashflow} target="_blank" download>
                          <ButtonComponent cssClass='e-info' className="!capitalize" >Download</ButtonComponent>
                        </a>
                      </div>
                      <div className='control-pane mt-4' ref={dropContainerRef}>
                        <div className='control-section col-lg-12 uploadpreview p-0 '>
                          <div className='upload_wrapper'>
                            <UploaderComponent id='validation' type='file' ref={uploadObj} selected={(args) => onFileSelected(args)} minFileSize={10000} autoUpload={false} allowedExtensions={allowedExtensions}></UploaderComponent>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="market" tabIndex={3}>
                      <div className="d-flex justify-end mt-2">
                        <a href={portFolioData.market} target="_blank" download>
                          <ButtonComponent cssClass='e-info' className="!capitalize" >Download</ButtonComponent>
                        </a>
                      </div>

                      <div className='control-pane mt-4' ref={dropContainerRef}>
                        <div className='control-section col-lg-12 uploadpreview p-0 '>
                          <div className='upload_wrapper'>
                            <UploaderComponent id='validation' type='file' ref={uploadObj} selected={(args) => onFileSelected(args)} minFileSize={10000} autoUpload={false} allowedExtensions={allowedExtensions}></UploaderComponent>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="corporate" tabIndex={4}>
                      <div className="d-flex justify-end mt-2">
                        <a href={portFolioData.corporate} target="_blank" download>
                          <ButtonComponent cssClass='e-info' className="!capitalize" >Download</ButtonComponent>
                        </a>
                      </div>

                      <div className='control-pane mt-4' ref={dropContainerRef}>
                        <div className='control-section col-lg-12 uploadpreview p-0 '>
                          <div className='upload_wrapper'>
                            <UploaderComponent id='validation' type='file' ref={uploadObj} selected={(args) => onFileSelected(args)} minFileSize={10000} autoUpload={false} allowedExtensions={allowedExtensions}></UploaderComponent>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>

                    <div className="btn-group my-4 d-flex justify-center gap-3">
                      {activeTab > 1 ? <ButtonComponent cssClass='e-info' className="!capitalize" onClick={() => toggleTab(activeTab - 1)}>Previous</ButtonComponent> : null}
                      {activeTab !== 4 ? <ButtonComponent cssClass='e-info' className="!capitalize" onClick={() => toggleTab(activeTab + 1)}>Next</ButtonComponent> : null}
                      <ButtonComponent cssClass='e-success' className="!capitalize" >Submit</ButtonComponent>
                    </div>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Transactions;
