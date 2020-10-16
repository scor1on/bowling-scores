import React from 'react';
import './App.css';
import { ScoreState } from './contexts/score';
import Game from './components/Game';
import Breadcrumb from 'antd/lib/breadcrumb/Breadcrumb';
import Layout from 'antd/lib/layout/layout';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <ScoreState>
      <Layout className='layout'>
        <Header>
          <div className='logo'>Bowling Scores</div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Game</Breadcrumb.Item>
          </Breadcrumb>
          <div className='site-layout-content'>
            <Game />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Bowling ©2020</Footer>
      </Layout>
    </ScoreState>
  );
}

export default App;
