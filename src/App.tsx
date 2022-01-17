import React, { useState } from 'react';
// Types / Interfaces
import { PostInterface } from './interfaces/interface';
// Chakra
import { Box, Button, Center, FormControl, Input, ListItem, Stack, StackDivider, Text, UnorderedList } from '@chakra-ui/react';
// api
import { initialItems } from './initialItems'

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [posts, setPosts] = useState<PostInterface[]>(initialItems)

  function addPost (event: React.ChangeEvent<Form>) {
    event.preventDefault();
    setPosts([...posts, {id: +new Date(), text: event.target.text.value}])
    event.target.text.value = ''
  }

  const removePost = (id: PostInterface["id"]) => {
    setPosts((posts) => posts.filter((post) => post.id !== id))
  }

  return (
    <>
      <Box bg='gray.900' color='gray.50'>
        <Stack direction='row' spacing={8} bg='gray.300' justify={'center'} padding={4}>
          <Button as = 'a' color='gray.900' variant='ghost'>Home</Button>
          <Button as = 'a' color='gray.900' variant='ghost'>Explore</Button>
          <Button as = 'a' color='gray.900' variant='ghost'>Top Posts</Button>
        </Stack>
        <Center marginTop={4}>
          <form onSubmit = {addPost}>
            <FormControl isRequired >
              <Input placeholder='Add to your blog' type = 'text' name = 'text' size='lg' w={'700px'}/>
              <Button bg = 'green.200' type = 'submit' size='lg' w={'100px'} marginLeft={6} marginBottom={1.5}>ADD</Button>
            </FormControl>
          </form>
        </Center>
        <Center marginTop={6}>
          <Box>
          <Stack spacing={2} divider={<StackDivider />}>
            <UnorderedList styleType={'none'} w='800px'>
              {posts?.map((post) => (
              <ListItem
                key = {post.id}
              >
                <Box margin={16} fontSize='25px'>
                  <Center>
                    <Text>Your Post</Text>
                  </Center>
                  <Center>
                    {post.text} <Button variant='ghost' size='md' marginLeft={6} onClick = {() => removePost(post.id)}>[X]</Button>
                  </Center>
                  <Text>Date: Today</Text>
                </Box>
              </ListItem>
              ))}
            </UnorderedList>
          </Stack>
          </Box>
        </Center>
      </Box>
    </>
  );
}

export default App;


