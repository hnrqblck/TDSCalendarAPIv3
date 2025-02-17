import React, {useContext} from 'react';
import { AuthContext } from "../providers/auth";
import { fetchProjectById,fetchMapById, fetchUserProjects } from "../../services/requestFunctions";
import { Select } from '@chakra-ui/react';
import Kits from "../Kits";

import './styles.scss';

const ConversationPoints = ({ placeHolder }) => {
    const [projects, setProjects] = React.useState([]);
    const [projectId, setProjectId] = React.useState('');
    const [mapsData, setMapsData] = React.useState([]);
    const [conversationPoints, setConversationPoints] = React.useState([]);
    const [futurePoints, setFuturePoints] = React.useState([]);
    const auth = useContext(AuthContext);

    React.useEffect(() => {
        fetchUserProjects(auth.apiToken).then((data) => {
            setProjects(data.map(proj => proj.projects));
        });
    }, [auth.apiToken]);

    React.useEffect(() => {
        fetchProjectById(auth.apiToken, projectId)
            .then(data => {
            if (projectId) data.maps.map( mapInfo => {
                setMapsData([]);
                fetchMapById(auth.apiToken, mapInfo.id)
                .then( mapData => {
                    setMapsData(mapsData => [...mapsData, mapData] );
                    });
                });
            });
    }, [projectId]);
    
    React.useEffect(() => {
        if (mapsData.length > 0) {
          setConversationPoints([]);
          mapsData.forEach( singleMap => {
            const convPoints = singleMap.points.filter(point => point.point_type === 'CONVERSATION')
            const addSplitDate = convPoints.map( point => {
                const d = point.opening_date;
                const dateToUTC = Date.UTC(Number(d.slice(0, 4)), (Number(d.slice(5, 7)) - 1), Number(d.slice(8, 10)), Number(d.slice(11, 13)), Number(d.slice(14, 16)));
                const date = new Date(dateToUTC);
                return point = ({ splitDate: date.toLocaleString().split(' '), ...point})
            });
            setConversationPoints( conversationPoints => [...conversationPoints, addSplitDate] );
          })
        } 
        // else {
        //     setFuturePoints('esse projeto não tem pontos futuros');
        // }
      }, [mapsData]);

    React.useEffect(() => {
        setFuturePoints([]);
        conversationPoints.forEach( singleGroup => {
            setFuturePoints(futurePoints => [...futurePoints, singleGroup.filter(isInTheFuture)]);
    });
    }, [conversationPoints]);

    const isInTheFuture = value => {
        const date = new Date();
        const today = date.toISOString().split('T')[0];
        const year = parseInt(value.splitDate[0].slice(6, 10));
        const month = parseInt(value.splitDate[0].slice(3, 5));
        const day = parseInt(value.splitDate[0].slice(0, 2));
        if (year >= parseInt(today.slice(0, 4)) && month > parseInt(today.slice(5, 7)) || (year >= parseInt(today.slice(0, 4)) && month === parseInt(today.slice(5, 7)) && day >= parseInt(today.slice(8, 10)))) return true;
    }  
    
  return (
    <div className="projects">
        <Select placeholder={placeHolder} onChange={(e) => setProjectId(e.target.value)}>
            {projects.map(value => value.map(pr => (
                <option onSelect={() => {
                setProjectId(pr.id)
                console.log(pr.id)
                }} value={pr.id} key={pr.id}>{pr.title}</option>
            )))}
        </Select>
        <Kits stateArray={futurePoints}/>
    </div>
  )
};

export default ConversationPoints;

            
