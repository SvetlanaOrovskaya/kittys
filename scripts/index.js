const cardsContainer = document.querySelector('.cards');
const btnOpenPopupForm = document.querySelector('#add');

const formAddCat = document.querySelector('#popup-form-cat');
const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();

function handleFormAddCat(e) {
  e.preventDefault();

  const elementsFormCat = [...formAddCat.elements];
  const dataFromForm = serializeForm(elementsFormCat);
  api.addNewCat(dataFromForm);
  createCat(dataFromForm);
  popupAddCat.close();
}

function deleteCat(cat) {
  console.log(cat);}
  
btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());

formAddCat.addEventListener('submit', handleFormAddCat);

api.getAllCats().then((data) =>
  data.forEach((cat) => {
    createCat(cat);
    const btnDelete = document.addEventListener('click', () =>
      deleteCat(cat)
    );
  })
);


