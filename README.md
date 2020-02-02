# FR ToDo List

Demo: https://akeamwoods.github.io/FR_ToDo_List/

Disclaimer: This project was created < 4 hours

# How To Use
To create as 'ToDo' simply enter some text in the top form and either hit submit or click the add button.
You can assign priority to the todo BEFORE it is created via the select dropdown.
To re-assign a todo drag and drop it onto the desired list.

You can...
- sort the todo's (index, a-z, z-a) via the sort select drop-down.
- delete all todo's via the clear all button
- delete todo's of a specific priority by clicking the x button next to the lists name.
- delete a specific todo via the x button on the todo itself.
- edit the todo's content by clicking the edit button, changing the text, then clicking save.
- leave and re-enter the application and the data will be persisted in local storage (thanks, redux-persist...)

From the set criteria, the only two things I didn't complete (as I ran out of time) were unit testing and E2E testing which were both from the bonus section. Whilst I have done unit testing at work, I haven't really had much experience doing E2E testing, and whilst i'm sure this is something I can easily learn, I wanted to show my current skill level.

# Things to note
- You may notice some 'interesting' (weird) design choices throughout the code. I initially started out with the idea of writing clean, re-usable components. I soon realised this was naive considering I had a set time limit. If you see examples of things being passed as props which I could fetch within the component itself using a selector, this is why. Had this been for a production level project (where I had more time) I would've made the components more generic where possible. 

- I chose redux as this is what I'm experienced with and it easily allowed me to persist state to local storage through the redux-persist package.

- I wasted about 30 minutes trying to implement drag and drop todo re-ordering. I had a problem where the reference to the todo was lost on re-renders which resulted in an error. Had I been given more time this is something I would've implemented.

- Styling. I'm not particularly proud of the applications look/feel, particularly the select drop down at the top of the page. On Windows it looks fine, but on mac the height is smaller than the rest of the input bar which doesn't look great. I wanted to create a drop-down component to get around this issue but I didn't want to sink time into that as opposed to other features.

If I had more time...
- Animation. If I had more time I would've added animation to the todo's via react-spring.
- Warning prompts. I would've added in an alert/warning system to get user verification before deleting a todo.
