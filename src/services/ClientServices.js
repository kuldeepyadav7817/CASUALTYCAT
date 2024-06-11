import http from "../httpClient";

const insertClient = data => {
    return http.post('/add/client/setClientDraft',data);
};

const fetchClient = searchData => {
    return http.get('/add/client/getAllClients?pageNo='+searchData.pageNo+'&count=' + searchData.count);
};

const getAllCount = () => {
    return http.get('/add/client/CountAllColl');
};

const filterAdminClient = searchData => {
    return http.get('/add/client/adminFilter?pageNo='+searchData.pageNo+'&count=' + searchData.count+'&type=' + searchData.type+'&value=' + searchData.value);
};

const filterAdminClientCount = searchData => {
    return http.get('/add/client/adminFilterCount?type=' + searchData.type+'&value=' + searchData.value);
};

const resend = clientID => {
    return http.get('/add/client/resend?clientID=' + clientID);
};

const controls = searchData => {
    return http.get('/add/client/controls?clientID=' + searchData.clientID +'&team=' + searchData.team);
};

const controlsQuestion = searchData => {
    return http.get('/add/client/controlsQuestion?clientID=' + searchData.clientID +'&controls=' + searchData.controls);
};

const saveRes = searchData => {
    return http.get('/add/client/saveRes?clientID=' + searchData.clientID +'&answer=' + searchData.answer +'&index=' + searchData.index +'&answerOption=' + searchData.answerOption +'&score=' + searchData.score);
};

const markQues = searchData => {
    return http.get('/add/client/markQues?clientID=' + searchData.clientID + '&index=' + searchData.index +'&value=' + searchData.value);
};

const getQuesCountTeam = clientID => {
    return http.get('/add/client/getQuesCountTeam?clientID=' + clientID);
};

const overallStatus = clientID => {
    return http.get('/add/client/overallStatus?clientID=' + clientID);
};

const generalQuestions = clientID => {
    return http.get('/add/client/generalQuestions?clientID=' + clientID);
};

const generalStatus = clientID => {
    return http.get('/add/client/generalStatus?clientID=' + clientID);
};

const saveGeneral = searchData => {
    return http.get('/add/client/saveGeneral?clientID=' + searchData.clientID + '&qID=' + searchData.id +'&answer=' + searchData.answer);
};

const saveCoface = searchData => {
    return http.post('/add/client/saveCoface?clientID=' + searchData.clientID + '&qID=' + searchData.id, searchData.cof);
};

const saveGeneralCheck = searchData => {
    return http.get('/add/client/saveGeneralCheck?clientID=' + searchData.clientID + '&qID=' + searchData.id +'&answer=' + searchData.answer +'&value=' + searchData.value);
};

const uploadDoc = uploadData => {
    const url = '/add/client/upload/claimForm?clientID='+uploadData.clientID+"&category="+uploadData.category;
    return http.post(url,uploadData.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
};

const deleteDoc = delData => {
    return http.get('/add/client/deleteFile?clientID='+delData.clientID+"&path="+delData.path);
};

const regenerate = clientID => {
    return http.get('/add/client/regenerate?clientID='+clientID);
};

const valueatrisk = clientID => {
    return http.get('/add/client/var?clientID='+clientID);
};

const clientCheck = emailID => {
    return http.get('/add/client/clientCheck?emailID='+emailID);
};

const clientDetails = emailID => {
    return http.get('/add/client/clientDetails?emailID='+emailID);
};

const getSavedWord = clientID => {
    return http.get("/add/client/getReport?clientID="+clientID);
};

const coface = () => {
    return http.get("/add/client/coface");
};

const uploadCIReport = uploadData => {
    const url = '/add/client/saveDoc?clientID='+uploadData.clientID;
    return http.post(url,uploadData.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  };
  
const ClientServices = {
    clientCheck,
    coface,
    getSavedWord,
    uploadCIReport,
    clientDetails,
    regenerate,
    valueatrisk,
    insertClient,
    fetchClient,
    getAllCount,
    filterAdminClient,
    filterAdminClientCount,
    resend,
    controls,
    controlsQuestion,
    saveRes,
    saveCoface,
    markQues,
    getQuesCountTeam,
    overallStatus,
    generalQuestions,
    saveGeneral,
    generalStatus,
    saveGeneralCheck,
    uploadDoc,
    deleteDoc
};

export default ClientServices;