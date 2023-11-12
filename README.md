# rubiskit

Pronounced roo-biscuit, emphasis on the biscuit

## What is it?

At the moment, Rubiskit is simply a 2D/3D Rubik's cube simluator. In future, I plan to expand it to incorporate speedsolving tools to help learn algorithms.

## Controls

If you are familiar with Rubik's cube notation, most of the moves can be done using (almost) regular notation. Even if you are not, brief explanations are provided in the tables below.

By default, a move or rotation will be clockwise, and you must hold shift + the relevant keybinding to reverse the direction.

To perform a wide move, hold space while pressing the desired key. Note that the animations for wide moves are still not 100%. Also ensure that you do not have any buttons on the page selected, as pressing space will activate said button.

### Regular moves
| Key    | Move                |
| ------ | --------------------|
| r      | R (right face)      |
| u      | U (upper face)      |
| l      | L (left face)       |
| f      | F (front face)      |
| d      | D (down face)       |
| b      | B (back face)       |

Some common moves are also available using the arrow keys. Similar to above, holding shift while pressing one of these keys will execute an anti-clockwise rotation.
| Key          | Move                |
| ------------ | ------------------- |
| Right arrow  | R (right face)      |
| Up arrow     | U (upper face)      |
| Left arrow   | L (left face)       |
| Down arrow   | D (down face)       |


### Advanced moves
| Key    | Move                |
| ------ | --------------------|
| s      | S (standing slice)  |
| e      | E (equator slice)   |
| m      | M (middle slice)    |


### Rotations
| Key    | Rotation                                  |
| ------ | ----------------------------------------- |
| x      | x (rotate clockwise around right face)    |
| y      | y (rotate clockwise around up face)       |
| z      | z (rotate clockwise around front face)    |


### Wide moves
Wide moves are implemented for all regular moves as listed in the table above. To activate a wide move, hold space while pressing the desired key. Using shift will still work as usual, performing an anti-clockwise move.


