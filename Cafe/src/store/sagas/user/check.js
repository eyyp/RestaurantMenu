import { put, call} from 'redux-saga/effects';
import * as actions from '../../actions/user/user_check';
import { Checks } from '../../../services/methods/user';
import { setToken } from '../../../config';

export default function* ChecksSaga(action) {

  try{
    yield put(actions.enableLoader());
    const response = yield call(Checks,action.user_name,action.password);
    if (response) {
        yield call(setToken,response.data.access_token);
        yield put(actions.Response(response.data));
        yield put(actions.disableLoader({}));
    } 
    else {
        yield put(actions.Failed());
        yield put(actions.disableLoader({}));
    }
  } 
  catch (error) {
    console.log("error:",error)
    yield put(actions.Failed());
    yield put(actions.disableLoader({}));
  } 
  finally {
    yield put(actions.disableLoader({}));
  }
}