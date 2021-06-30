## Sanity Plugin Vimeo Browser

> A plugin to browse and select vimeo videos directly from the Sanity studio.

**Disclaimer: This plugin is very WIP and it's API might change in the future**

![Demo picture](https://github.com/FNATIC/sanity-plugin-vimeo-browser/raw/main/docs/VimeoDemo.gif)

## Installation

```bash
  sanity install @fnc/sanity-plugin-vimeo-browser
```

Add `vimeo.video` to the schemas where you want to have video support.

Make sure to add an env variable called SANITY_STUDIO_VIMEO_TOKEN. Generate this token via the Vimeo dashboard (Requires Vimeo Pro). It needs access to the scopes `private create upload video_files public`.

## Development

To develop this plugion locally, run the command `npm link` in the root folder of this project. Open a new terminal at the root of the studio folder and run the command `npm link @fnc/sanity-plugin-vimeo-browser`. Then you can run `npm run dev` from this folder, and the project will hot reload at file changes.

## Credit

Thanks to Robin Pyon and [Sanity Plugin Media](https://github.com/robinpyon/sanity-plugin-media) for details on how to make a full screen input component.
