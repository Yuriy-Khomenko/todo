import md5 from 'md5';
import url from '../url/url.js';
import { emit_fetchData, emit_ChangePage, emit_ChangeSortDir, emit_ChangeSortField } from '../actions/actions';

export function saveTasc(fields) {
    let { username, email, text, image } = fields;

    let data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("text", text);
    data.append("image", image);

    return emit_fetchData(url.create, {
        method: 'POST',
        body: data
    });
}


export function getTasks(fields) {
    let { page, sort_direction, sort_field } = fields;

    return emit_fetchData(url.tasks + page
        + '&sort_direction=' + sort_direction
        + '&sort_field=' + sort_field
    );
}


export function saveChanges(fields) {
    let { status, task, id } = fields;

    let str_URI = "status=" + status + "&text=" + encodeURIComponent(task) + "&token=beejee";
    let str_md5 = md5(str_URI);

    let data = new FormData();
    data.append("status", status);
    data.append("text", encodeURIComponent(task));
    data.append("token", "beejee");
    data.append("signature", str_md5);

    return emit_fetchData(url.edit + id + 'id?developer=Yuriy', { method: 'POST', body: data });
}


export function changePage(fields) {

    let { page, sort_direction, sort_field } = fields;

    return (dispatch, getState) => {

        let { reducMain: stor } = getState();

        if (stor.page !== page) {
            dispatch(emit_ChangePage(page));
        }
        if (stor.sort_direction !== sort_direction) {
            dispatch(emit_ChangeSortDir(sort_direction));
        }
        if (stor.sort_field !== sort_field) {
            dispatch(emit_ChangeSortField(sort_field));
        }

        dispatch(emit_fetchData(url.tasks + page
            + '&sort_direction=' + sort_direction
            + '&sort_field=' + sort_field
        ));
    }
}