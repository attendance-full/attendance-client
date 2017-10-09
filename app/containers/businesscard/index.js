import React, { Component } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

class BusinessCard extends Component {
    render() {
        return <Card expanded={true}>
            <CardMedia
                expandable={true}
                overlay={<CardTitle title="黄成会" subtitle="苍南县龙港茂隆纸塑制品厂" />}
                overlayContentStyle={{background: 'none'}}
            >
                <img src="images/timg.jpg" alt="" />
            </CardMedia>
            <List>
                <ListItem primaryText="电话：13566126878" />
                <Divider />
                <ListItem primaryText="QQ号：769567258" />
                <Divider />
                <ListItem primaryText="邮箱：769567258@qq.com" />
                <Divider />
                <ListItem primaryText="地址：浙江省温州市龙港镇宫后路216号" />
            </List>
        </Card>
    }
}

export default BusinessCard;