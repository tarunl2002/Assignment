import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchPosts } from '../services/postService';
import { Post } from '../types/Post';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DepartmentList from '../Components/DepartmentList';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    } else {
      const getPosts = async () => {
        try {
          const posts = await fetchPosts();
          setPosts(posts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };
      getPosts();
    }
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5} width="100%">
      <Typography variant="h4" gutterBottom>
        Welcome to the Second Page
      </Typography>
      <Typography>
        You have successfully entered your details.
      </Typography>
      <div style={{ height: 600, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={posts}
          columns={columns}
        //   pageSize={10}
        //   rowsPerPageOptions={[10]}
          loading={loading}
        />
      </div>
      <DepartmentList />
    </Box>
  );
};

export default Home;
