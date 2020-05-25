import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';

interface FormModalProps {
  width?: number;
  title: string;
  visible: boolean;
  current: Partial<any> | undefined;
  onSubmit: (fieldsValue: any) => void;
  onCancel: () => void;
}

const FormModal: React.FC<FormModalProps> = (props) => {
  const [form] = Form.useForm();
  const [oldRecord, setOldRecord] = useState<any>();
  const { children, title, width: modelWidth, current, visible, onCancel, onSubmit: handleAdd } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  // 初始化赋值
  useEffect(() => {
    if (current) {
      setOldRecord(current);
      form.setFieldsValue({
        ...current,
      })
    }
  }, [props.current]);

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    // 将未修改的值也赋值回来
    handleAdd({ ...oldRecord, ...fieldsValue });
  };

  const formLayout = {
    labelCol: { span: 4, offset: 2 },
    wrapperCol: { span: 16 }
  }
  let width = (modelWidth && modelWidth > 100) ? modelWidth : 500;
  return (
    <Modal
      destroyOnClose
      width={width}
      title={title}
      visible={visible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}>
        {children}
      </Form>
    </Modal>
  );
}

export default FormModal;
