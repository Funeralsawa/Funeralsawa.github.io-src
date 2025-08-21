import React, { Component } from 'react';
import $ from "jquery"
import { createRef } from 'react';

class Subscribe extends Component {
    state = {
        passwordIsRight: false,
        mainSubscribe: "",
        backup1: "",
        backup2: "",
        backup3: ""
    }
    inputRef = createRef();

    styleDiv = {
        color: "white",
    }

    styleInput = {
        display: "inline-block",
        opacity: "10%",
        borderRadius: "10px"
    }

    copyText = () => {
        const Text = $(".subscribeDiv").text();
        navigator.clipboard.writeText(Text).then(() => {
            alert("复制成功~");
            $('.copy').html('<i class="bi bi-check-lg"></i>');
        }).catch(err => {
            alert("复制失败：" + err);
        });
    }

    handelClick = () => {
        const value = this.inputRef.current.value;
        if(value) {
            $.ajax({
                url: "https://app7431.acapp.acwing.com.cn/settings/get_subscribe/",
                type: "post",
                dataType: "json",
                data: {
                    password: value
                },
                success: (data) => {
                    if(data.result === "success")
                        this.setState({
                            passwordIsRight: true,
                            backup1: data.backup[0],
                            backup2: data.backup[1],
                            backup3: data.backup[2],
                            mainSubscribe: JSON.stringify(data.main)
                        });
                    else console.log(data.result);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    console.log(jqXHR.responseText);
                }
            });
        }
        else console.log("不能为空！")
    }

    render() { 
        if(!this.state.passwordIsRight)
            return (
                <React.Fragment>
                    <div style={this.styleDiv}>
                        <input type="password" style={this.styleInput} ref={this.inputRef} />
                        <button className='btn' onClick={this.handelClick}>提交</button>
                    </div>
                </React.Fragment>
            );
        else
            return (
                <React.Fragment>
                    <p style={{color: "gold"}}>Hello TPS Member</p>
                    <div className='subscribeDiv'>
                        <p>主：{this.state.mainSubscribe}</p>
                        <p>备用1：{this.state.backup1}</p>
                        <p>备用2：{this.state.backup2}</p>
                        <p>备用3：{this.state.backup3}</p>
                    </div>
                    <button onClick={this.copyText} className='btn btn-outline-dark btn-lg copy'>复制</button>
                </React.Fragment>
            );
    }
}
 
export default Subscribe;