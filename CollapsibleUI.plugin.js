/**
 * @name CollapsibleUI
 * @author programmer2514
 * @authorId 563652755814875146
 * @description A simple plugin that allows collapsing various sections of the Discord UI.
 * @version 2.1.1
 * @website https://github.com/programmer2514/BetterDiscord-CollapsibleUI
 * @source https://raw.githubusercontent.com/programmer2514/BetterDiscord-CollapsibleUI/main/CollapsibleUI.plugin.js
 */

module.exports = (() => {

    // Define plugin configuration
    const config = {
        info: {
            name: 'CollapsibleUI',
            authors: [{
                name: 'programmer2514',
                discord_id: '563652755814875146',
                github_username: 'programmer2514'
            }],
            version: '2.1.1',
            description: 'A simple plugin that allows collapsing various sections of the Discord UI.',
            github: 'https://github.com/programmer2514/BetterDiscord-CollapsibleUI',
            github_raw: 'https://raw.githubusercontent.com/programmer2514/BetterDiscord-CollapsibleUI/main/CollapsibleUI.plugin.js'
        },
        changelog: [{
            title: '2.1.1',
            items: [
                'Added ZeresPluginLibrary support'
            ]
        }, {
            title: '2.0.1',
            items: [
                'Adjusted some pixel measurements to prevent cutting off the message bar while typing multiline messages'
            ]
        }, {
            title: '2.0.0',
            items: [
                'Added a button to collapse the window title bar',
                'Updated the button icons to be more consistent',
                'Finished adding transitions to collapsible elements',
                'Fixed issues with persistent button states',
                'Actually fixed plugin crashing on reload',
                'Fixed handling of plugin being disabled'
            ]
        }, {
            title: '1.2.1',
            items: [
                'Added a button to collapse the message bar',
                'Added transitions to some elements',
                'Improved support for non-english locales',
                'Improved handling of missing config'
            ]
        }, {
            title: '1.1.1',
            items: [
                'Fixed plugin crashing on reload (sorta)'
            ]
        }, {
            title: '1.1.0',
            items: [
                'Added persistent button states'
            ]
        }, {
            title: '1.0.0',
            items: [
                'Initial release'
            ]
        }]
    };

    // Check for ZeresPluginLibrary
    if (!window.ZeresPluginLibrary) {
        return class {
            constructor() { this._config = config; }
            getName() { return config.info.name; }
            getAuthor() { return config.info.authors.map(a => a.name).join(', '); }
            getDescription() { return config.info.description; }
            getVersion() { return config.info.version; }
            load() {
                BdApi.showConfirmationModal(
                    'Library Missing',
                    `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,
                    {
                        confirmText: 'Download Now',
                        cancelText: 'Cancel',
                        onConfirm: () => {
                            require('request').get('https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js', async (err, _response, body) => {
                                if (err) {
                                    return require('electron').shell.openExternal('https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js');
                                }
                                await new Promise(r => require('fs').writeFile(require('path').join(BdApi.Plugins.folder, '0PluginLibrary.plugin.js'), body, r));
                            });
                        }
                });
            }
            start() { }
            stop() { }
        }
    }

    // Build plugin
    const [Plugin, Api] = ZeresPluginLibrary.buildPlugin(config);

    // Define plugin class
    return class CollapsibleUI extends Plugin {

        // Main plugin code, called by start() and onSwitch()
        initialize() {

            // Purge CollapsibleUI toolbar icons
            document.querySelectorAll('.collapsible-ui-element').forEach(e => e.remove());

            // Apply transitions to UI elements
            document.querySelector('.sidebar-2K8pFh').style.transition = 'width 250ms';
            document.querySelector('.wrapper-3NnKdC').style.transition = 'width 250ms';
            if (document.querySelector('.membersWrap-2h-GB4')) {
                document.querySelector('.membersWrap-2h-GB4').style.overflow = 'hidden';
                document.querySelector('.membersWrap-2h-GB4').style.maxWidth = '240px';
                document.querySelector('.membersWrap-2h-GB4').style.transition = 'max-width 250ms, min-width 250ms';
                //document.querySelector('.search-36MZv-').previousElementSibling.style.display = 'none';
            }

            if (document.querySelector('.form-2fGMdU')) {
                document.querySelector('.form-2fGMdU').style.maxHeight = '400px';
                document.querySelector('.form-2fGMdU').style.transition = 'max-height 250ms';
            }

            // Define & add new toolbar icons
            // Icons are part of the Bootstrap Icons library, which can be found at https://icons.getbootstrap.com/
            var serverListButton = this.addToolbarIcon('Server List', '<path fill="currentColor" d="M-3.429,0.857C-3.429-0.72-2.149-2-0.571-2h17.143c1.578,0,2.857,1.28,2.857,2.857v14.286c0,1.578-1.279,2.857-2.857,2.857H-0.571c-1.578,0-2.857-1.279-2.857-2.857V0.857z M3.714-0.571v17.143h12.857c0.789,0,1.429-0.64,1.429-1.429V0.857c0-0.789-0.64-1.428-1.429-1.428H3.714z M2.286-0.571h-2.857C-1.36-0.571-2,0.068-2,0.857v14.286c0,0.789,0.64,1.429,1.429,1.429h2.857V-0.571z"/>', '-4 -4 24 24');
            var channelListButton = this.addToolbarIcon('Channel List', '<path fill="currentColor" d="M3.5,13.5c0-0.414,0.335-0.75,0.75-0.75h13.5c0.414,0,0.75,0.336,0.75,0.75s-0.336,0.75-0.75,0.75H4.25C3.835,14.25,3.5,13.914,3.5,13.5z M3.5,7.5c0-0.415,0.335-0.75,0.75-0.75h13.5c0.414,0,0.75,0.335,0.75,0.75s-0.336,0.75-0.75,0.75H4.25C3.835,8.25,3.5,7.915,3.5,7.5z M3.5,1.5c0-0.415,0.335-0.75,0.75-0.75h13.5c0.414,0,0.75,0.335,0.75,0.75s-0.336,0.75-0.75,0.75H4.25C3.835,2.25,3.5,1.915,3.5,1.5z M-1,3c0.828,0,1.5-0.672,1.5-1.5S-0.172,0-1,0s-1.5,0.672-1.5,1.5S-1.828,3-1,3z M-1,9c0.828,0,1.5-0.672,1.5-1.5S-0.172,6-1,6s-1.5,0.672-1.5,1.5S-1.828,9-1,9z M-1,15c0.828,0,1.5-0.671,1.5-1.5S-0.172,12-1,12s-1.5,0.671-1.5,1.5S-1.828,15-1,15z"/>', '-4 -4 24 24');

            // Read stored user data to decide active state of Server List button
            if (BdApi.getData('CollapsibleUI', 'serverListButtonActive') === 'false') {
                serverListButton.classList.remove('selected-1GqIat');
                document.querySelector('.wrapper-3NnKdC').style.width = '0px';
            } else if (BdApi.getData('CollapsibleUI', 'serverListButtonActive') === 'true') {
                serverListButton.classList.add('selected-1GqIat');
            } else {
                BdApi.setData('CollapsibleUI', 'serverListButtonActive', 'true');
                serverListButton.classList.add('selected-1GqIat');
            }

            // Read stored user data to decide active state of Channel List button
            if (BdApi.getData('CollapsibleUI', 'channelListButtonActive') === 'false') {
                channelListButton.classList.remove('selected-1GqIat');
                document.querySelector('.sidebar-2K8pFh').style.width = '0px';
            } else if (BdApi.getData('CollapsibleUI', 'channelListButtonActive') === 'true') {
                channelListButton.classList.add('selected-1GqIat');
            } else {
                BdApi.setData('CollapsibleUI', 'channelListButtonActive', 'true');
                channelListButton.classList.add('selected-1GqIat');
            }

            // Add event listener to the Server List button to update the icon, UI, & settings on click
            serverListButton.addEventListener('click', function(){
                if (BdApi.getData('CollapsibleUI', 'serverListButtonActive') === 'true') {
                    document.querySelector('.wrapper-3NnKdC').style.display = "none";
                    BdApi.setData('CollapsibleUI', 'serverListButtonActive', 'false');
                    this.classList.remove('selected-1GqIat');
                } else {
                    document.querySelector('.wrapper-3NnKdC').style.display = "initial";
                    BdApi.setData('CollapsibleUI', 'serverListButtonActive', 'true');
                    this.classList.add('selected-1GqIat');
                }
            });

            // Add event listener to the Channel List button to update the icon, UI, & settings on click
            channelListButton.addEventListener('click', function(){
                if (BdApi.getData('CollapsibleUI', 'channelListButtonActive') === 'true') {
                    document.querySelector('.sidebar-2K8pFh').style.display = "none";
                    BdApi.setData('CollapsibleUI', 'channelListButtonActive', 'false');
                    this.classList.remove('selected-1GqIat');
                } else {
                    document.querySelector('.sidebar-2K8pFh').style.display = "flex";
                    BdApi.setData('CollapsibleUI', 'channelListButtonActive', 'true');
                    this.classList.add('selected-1GqIat');
                }
            });
        }

        // Initialize the plugin when it is enabled
        async start() {

            // Wait for current user session to finish loading
            while (!document.body.hasAttribute('data-current-user-id')) {
                await new Promise(resolve => requestAnimationFrame(resolve));
            }

            // Wait for an additional second because FSR the message bar won't collapse correctly otherwise
            await new Promise(resolve => setTimeout(resolve, 1000))

            this.initialize();
            console.log('[CollapsibleUI] version 2.1.1 has started.');
        }

        // Restore the default UI when the plugin is disabled
        stop() {

            // Remove CollapsibleUI icons
            document.querySelectorAll('.collapsible-ui-element').forEach(e => e.remove());

            // Re-enable the original Members List icon
            document.querySelector('.search-36MZv-').previousElementSibling.style.removeProperty('display');

            // Expand any collapsed elements & remove transitions
            document.querySelector('.wordmark-2iDDfm').style.removeProperty('display');
            document.querySelector('.sidebar-2K8pFh').style.removeProperty('width');
            document.querySelector('.sidebar-2K8pFh').style.removeProperty('transition');
            document.querySelector('.wrapper-3NnKdC').style.removeProperty('width');
            document.querySelector('.wrapper-3NnKdC').style.removeProperty('transition');
            if (document.querySelector('.membersWrap-2h-GB4')) {
                document.querySelector('.membersWrap-2h-GB4').style.removeProperty('max-width');
                document.querySelector('.membersWrap-2h-GB4').style.removeProperty('min-width');
                document.querySelector('.membersWrap-2h-GB4').style.removeProperty('overflow');
                document.querySelector('.membersWrap-2h-GB4').style.removeProperty('transition');
            }
            if (document.querySelector('.form-2fGMdU')) {
                document.querySelector('.form-2fGMdU').style.removeProperty('max-height');
                document.querySelector('.form-2fGMdU').style.removeProperty('transition');
            }

            console.log('[CollapsibleUI] version 2.1.1 has stopped.');
        }

        // Re-initialize the plugin on channel/server switch to maintain icon availability
        onSwitch() {
            this.initialize();
        }

        // Adds a new SVG icon to the toolbar
        addToolbarIcon(ariaLabel, rawSVGData, viewBox) {

            // Create the icon and define properties
            var newToolbarIcon = document.createElement('div');
                newToolbarIcon.classList.add('iconWrapper-2OrFZ1');
                newToolbarIcon.classList.add('clickable-3rdHwn');
                newToolbarIcon.classList.add('collapsible-ui-element');
                newToolbarIcon.setAttribute('role', 'button');
                newToolbarIcon.setAttribute('aria-label', ariaLabel);
                newToolbarIcon.setAttribute('tabindex', '0');
                newToolbarIcon.innerHTML = '<svg x="0" y="0" class="icon-22AiRD" aria-hidden="false" width="24" height="24" viewBox="' + viewBox + '">' + rawSVGData + '</svg>';

            // Insert icon to the left of the search bar
            document.querySelector('.toolbar-1t6TWx').insertBefore(newToolbarIcon, document.querySelector('.search-36MZv-'));

            // Return DOM Element of newly-created toolbar icon
            return newToolbarIcon;

        }
    }

})();
