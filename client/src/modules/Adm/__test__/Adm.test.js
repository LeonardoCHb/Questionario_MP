import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { mount, configure } from "enzyme";
import EnzymeToJson from "enzyme-to-json";
import React from "react";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import Adm from "../Adm";

const AdmComponent = Adm.routeProps.component;

const user = {
  createdAt: "2021-04-30T23:54:53.614Z",
  _id: "608cce84d339170cd8ec9894",
  name: "Fernando",
  email: "fernando@email",
  password: "$2a$12$CDydrU0e8OwZZZNg0pWrgeuRBHaDimQplLKxBwNmDPvlrDJ24J69y",
  __v: 0,
};

localStorage.setItem("profile", JSON.stringify({ result: { ...user } }));

const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = [];
const store = mockStore(initialState);

configure({ adapter: new Adapter() });
it("Adm é renderizado ", () => {
  useSelectorMock.mockReturnValue([{ ...user }]);

  const subject = mount(
    <Provider store={store}>
      <ToastProvider placement="bottom-right">
        <AdmComponent />
      </ToastProvider>
    </Provider>
  );
  expect(EnzymeToJson(subject)).toMatchSnapshot();
});
