import React from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { connect } from 'dva'
import router from 'umi/router'
const { Option } = Select;
const { TextArea } = Input;
class Index extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        const { dispatch, location } = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'admin_cid/updateContest', 
                    payload: values
                })
                router.push(location.pathname)
                // console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 18 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const { ID, begin_time, end_time, mid, contests_name, AllMessage } = this.props;
        console.log(AllMessage);
        
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="ID">
                    {getFieldDecorator('cid', {
                        initialValue: ID
                    })(<Input disabled={true} />)}
                </Form.Item>
                <Form.Item label="比赛名称">
                    {getFieldDecorator('contests_name', {
                        rules: [
                            { required: true, message: '请输入1~11个字符', min: 1, max: 11 },
                        ],
                        initialValue: contests_name
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="比赛文章">
                    {getFieldDecorator('mid', {
                        initialValue: mid,
                        rules: [
                            { required: true, message: '请选择等级' }
                        ],
                    })(<Select style={{ width: '100%' }}>
                        {AllMessage === undefined ? null : AllMessage.map(item => {
                            return <Option value={item.mid}>{item.name}</Option>
                        })}
                    </Select>)}
                </Form.Item>
                <Form.Item label="开始时间">
                    {getFieldDecorator('begin_time', {
                        initialValue: begin_time,
                        rules: [
                            { required: true, message: '请输入开始时间' }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="结束时间">
                    {getFieldDecorator('end_time', {
                        initialValue: end_time,
                        rules: [
                            { required: true, message: '请输入结束时间' }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        更新
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    const { ID, begin_time, end_time, mid, contests_name, AllMessage } = state.admin_cid
    return {
        loading: state.loading.models.admin_cid,
        begin_time,
        end_time,
        mid,
        contests_name,
        ID,
        AllMessage
    }
}

export default Form.create()(connect(mapStateToProps)(Index))