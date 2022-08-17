# Visgraph

## Intro 
A web based 2D graphing calculator + taylor series and SGD (gradient descent) visualiser made in javascript (requires a large display (laptop minimum) to run). Visgraph visualises equations with y as the subject and can animate the results. To use, type an equation in the upper left text box. All equations must start with "y=". There is a section bellow for the syntax that should be used for the equation. From here you can run taylor series (move the slider to control which power it goes up to) and SGD to find the functions minimums.

## Syntax

Equations must follow syntax recognised by the Math.js library string evaluator. To raise to exponents, use pow(x,n) and if multiplying be sure to use *. Most functions (eg:sin(x), log(x), tan(x)) will work without any special syntax. Note exp, sigmoid and some others are not avaidible due to module compatability issues. 

## Installation
Vigraph should run on most web browsers as it is vanilla js so to install just clone this repository and open it in one to play around with it, alternitevely you can view it on repl [here](https://replit.com/@HamishHamiltonS/Visgraph-Graphing-calculator?v=1).

## Examples

Here are some examples on what visgraph can make:

![Image](https://github.com/HamishHamiltonSmith/Visgraph-Graphing-Calculator/blob/main/examples/Screenshot%202022-08-17%2019.22.25.png)

This is a taylor series of a sine wave

![Image2](https://github.com/HamishHamiltonSmith/Visgraph-Graphing-Calculator/blob/main/examples/Screenshot%202022-08-17%2019.23.41.png)

A basic quadratic

![Image3](https://github.com/HamishHamiltonSmith/Visgraph-Graphing-Calculator/blob/main/examples/Screenshot%202022-08-17%2019.24.54.png)

A gradient descent algorithm running on a very fancy equation I just discovered
