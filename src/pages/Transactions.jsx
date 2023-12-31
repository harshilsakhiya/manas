import React, { useCallback, useMemo, useRef, useState } from "react";
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
import * as XLSX from 'xlsx';
import UploadService from "../services/uploadService";

const Transactions = () => {
  // const selectionsettings = { persistSelection: true };
  // const toolbarOptions = ["Delete"];
  // const editing = { allowDeleting: true, allowEditing: true };
  const fields = { text: "name", value: "id" }
  const [screen, setScreen] = useState("initial");
  const [activeKey, setActiveKey] = useState("portfolio")
  const [activeTab, setActiveTab] = useState(1);
  const [fileData, setFileData] = useState([])
  const [dropdownValue, setDropdownValue] = useState({
    existingPortfolio: "",
    newPortfolio: "",
    deletePortfolio: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")


  let uploaderRef = useRef(null);

  const allowedExtensions = useMemo(() => '.csv, .xls, .xlsx', []);

  const uploadData = useCallback(async (data) => {
    let response = null;

    if (activeTab === 1) response = await UploadService.uploadPortFolioData(data)
    else if (activeTab === 2) response = await UploadService.uploadCashflowData(data)
    else if (activeTab === 3) response = await UploadService.uploadMarketData(data)
    else if (activeTab === 4) response = await UploadService.uploadCorporateData(data)

    return response

  }, [])


  const submitData = useCallback(async (args) => {
    setError("")
    setIsLoading(true)
    const res = await uploadData(fileData);
    if (!res?.success) {
      setError("Something went wrong, please try again!")
    }
    setIsLoading(false)


  }, [fileData])

  const onFileSelected = useCallback((args) => {
    // args.filesData.splice(5);
    const file = args.event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result;
        const workbook = XLSX.read(fileData, { type: 'binary' });

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const transformedData = data.slice(1).map((row) => {
            const obj = {};
            data[0].forEach((key, index) => {
              obj[key] = row[index] !== undefined ? row[index] : '';
            });
            return obj;
          });
          setFileData(transformedData)

        });
      };

      reader.readAsBinaryString(file);
    }

    // let allFiles = filesData.concat(args.filesData);
    // if (allFiles.length > 5) {
    //   for (let i = 0; i < allFiles.length; i++) {
    //     if (allFiles.length > 5) {
    //       allFiles.shift();
    //     }
    //   }
    //   args.filesData = allFiles;
    //   args.modifiedFilesData = args.filesData;
    // }
    args.isModified = true;
  }, []);

  const handleDropDownChange = useCallback((e) => {
    const selectedValue = e.target.value;
    const selectedName = e.target.name
    // Do something with the selected value

    setDropdownValue({
      ...dropdownValue, [selectedName]: selectedValue
    })
  }, [dropdownValue])


  const toggleTab = useCallback((tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className="container">
      <Header category="" title="Upload Portfolio Data" />

      {screen === "initial" && (
        <div className="row  d-flex justify-center ">
          <div className="col-2"></div>

          <div
            className=" bg-light col-8  border border-dark rounded-2xl text-center p-5 "
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
                <DropDownListComponent id="existing-portfolio" dataSource={existingPortFolio} fields={fields} name="existingPortfolio" placeholder="Select Existing Portfolio" onChange={handleDropDownChange} />

              </div>

              <div className="form-group mb-4">
                <DropDownListComponent id="new-portfolio" dataSource={newPortFolio} fields={fields} name="newPortfolio" placeholder="Add New Portfolio" onChange={handleDropDownChange} />
              </div>

              <div className="form-group mb-4 ">
                <DropDownListComponent id="delete-portfolio" dataSource={newPortFolio} fields={fields} name="deletePortfolio" placeholder="Delete Selected Portfolio" onChange={handleDropDownChange} />

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
            className="Container p-5 bg-light border border-dark rounded-2xl text-center mt-3 mb-5 w-9/12"
            style={{ boxShadow: "0 5px 5px  #737373" }}
          >
            {error ? <div className="text-rose-700">{error}</div> : null}
            <div className="row d-flex justify-center w-full">
              <div className="mt-4 w-full">
                <Tab.Container defaultActiveKey={activeKey}>
                  <Nav variant="pills" className="d-flex justify-center">
                    {activeTab === 1 && <Nav.Item className="mr-2">
                      <Nav.Link
                        active={true}
                        eventKey="portfolio"
                        className="font-weight-bold border"
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Portfolio Data
                      </Nav.Link>

                    </Nav.Item>}

                    {activeTab === 2 && <Nav.Item className="mr-2">
                      <Nav.Link
                        active={true}
                        eventKey="cashflow"
                        className=" font-weight-bold border "
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Cashflow Data
                      </Nav.Link>
                    </Nav.Item>}

                    {activeTab === 3 && <Nav.Item className="mr-2">
                      <Nav.Link
                        active={true}
                        eventKey="market"
                        className="font-weight-bold border  "
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Market Data
                      </Nav.Link>
                    </Nav.Item>
                    }
                    {activeTab === 4 && <Nav.Item className="mr-2">
                      <Nav.Link
                        active={true}
                        eventKey="corporate"
                        className="font-weight-bold border "
                        style={{ borderRadius: "8px" }}
                      >
                        Upload Corporate Action Data
                      </Nav.Link>
                    </Nav.Item>}

                  </Nav>

                  <Tab.Content activeTab={activeTab}>

                    <Tab.Pane eventKey="portfolio" tabIndex={1}>
                      <div className="d-flex justify-end mt-2">
                        <a href={portFolioData.portfolio} target="_blank" download>
                          <ButtonComponent cssClass='e-info' className="!capitalize" >Download</ButtonComponent>
                        </a>
                      </div>
                      <div className='control-pane mt-4'>
                        <div className='control-section col-lg-12 uploadpreview p-0 '>
                          <div className='upload_wrapper'>
                            <UploaderComponent id='validation' type='file' multiple={false} selected={(args) => onFileSelected(args)} autoUpload={true} allowedExtensions={allowedExtensions} ></UploaderComponent>
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
                      <div className='control-pane mt-4'>
                        <div className='control-section col-lg-12 uploadpreview p-0 '>
                          <div className='upload_wrapper'>
                            <UploaderComponent id='validation-2' type='file' multiple={false} selected={(args) => onFileSelected(args)} autoUpload={true} allowedExtensions={allowedExtensions}></UploaderComponent>
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

                      <div className='control-pane mt-4'>
                        <div className='control-section col-lg-12 uploadpreview p-0 '>
                          <div className='upload_wrapper'>
                            <UploaderComponent id='validation-3' type='file' multiple={false} selected={(args) => onFileSelected(args)} autoUpload={true} allowedExtensions={allowedExtensions}></UploaderComponent>
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

                      <div className='control-pane mt-4'>
                        <div className='control-section col-lg-12 uploadpreview p-0 '>
                          <div className='upload_wrapper'>
                            <UploaderComponent id='validation-4' type='file' multiple={false} selected={(args) => onFileSelected(args)} autoUpload={true} allowedExtensions={allowedExtensions}></UploaderComponent>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>

                    <div className="btn-group my-4 d-flex justify-center gap-3">
                      {activeTab > 1 ? <ButtonComponent cssClass='e-info' className="!capitalize" onClick={() => toggleTab(activeTab - 1)}>Previous</ButtonComponent> : null}
                      {activeTab !== 4 ? <ButtonComponent cssClass='e-info' className="!capitalize" onClick={() => toggleTab(activeTab + 1)}>Next</ButtonComponent> : null}
                      <ButtonComponent cssClass='e-success' className="!capitalize" disabled={isLoading} onClick={submitData} >{isLoading ? "Loading..." : "Submit"}</ButtonComponent>
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
