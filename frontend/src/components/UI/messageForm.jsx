import {useFormik} from "formik";
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

export default () => {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validationSchema: yup.object({
            message: yup.string().required().trim(),
        }),
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="d-flex">
                <Form.Control
                    type="text"
                    name="message"
                    required
                    placeholder={'Введите сообщение...'}
                    aria-label={'chatPage.label'}
                    disabled={formik.isSubmitting}
                    className="p-0 ps-2"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                />
                <button className="btn border-0" type="submit" disabled={!formik.dirty || !formik.isValid}>
                    <ArrowRightCircleFill size={30} />
                    <span className="visually-hidden">Введите сообщение...</span>
                </button>
            </Form.Group>
        </Form>
    )
}