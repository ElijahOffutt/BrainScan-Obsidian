Oh I see. So if I am understanding this right, I would be building the bridge in to the window it self given that its based on electron and the windows is basically free real-estate for me to put functionality in to that both these instances of the solution will share. My plugin will have access to the window given that its a chromium based solution and my interface will as well given that its all in the same window; is that about right? But now I wonder, given that the iframe approach puts it in a different window and or sub-window, wouldn't that create a barrier between them? Is that mitigated with the `window.parent` reference you had in code block example one of the most recent replay? Does `window.parent` return the parent window in general?



