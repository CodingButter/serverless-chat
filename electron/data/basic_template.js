const getUuid = require('uuid-by-string')
const { generateKeyPair } = require('../src/utils/enc')

const { privateKey, publicKey } = generateKeyPair()

module.exports = {
  users: [
    {
      username: 'codingbutter',
      password: 'password',
      peerId: getUuid(`codingbutterpassword`),
      publicKey,
      privateKey
    }
  ],
  servers: [
    {
      name: 'Beast Server',
      avatar: 'https://raw.githubusercontent.com/CodingButter/serverless-chat/main/src/assets/icons/ghost.gif',
      ownerPeerId: getUuid(`codingbutterpassword`)
    }
  ],
  categories: [
    {
      id: 'GENERAL',
      name: 'General',
      description: 'General category',
      position: 0
    }
  ],
  channels: [
    {
      name: 'rules',
      avatar: null,
      description: 'Read the rules before you start chatting!',
      type: 'text',
      position: 0,
      category: 'GENERAL',
      roles: [
        {
          name: 'everyone',
          additional_permissions: [],
          denied_permissions: ['SEND_MESSAGES']
        }
      ],
      default_permissions: ['VIEW_CHANNEL']
    },
    {
      name: 'Introduction',
      avatar: null,
      position: 1,
      description: 'Introduce yourself to the community!',
      type: 'text',
      category: 'general',
      roles: [
        {
          name: 'everyone',
          extends: 'EVERYONE',
          denied_permissions: ['EMBED_LINKS', 'ATTACH_FILES', 'SEND_TTS_MESSAGES']
        }
      ]
    }
  ],
  roles: [
    {
      id: 'EVERYONE',
      name: '@everyone',
      avatar: null,
      description: 'Default role for everyone',
      color: 0,
      default_permissions: [
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'USE_VAD',
        'ADD_REACTIONS',
        'SEND_TTS_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES'
      ]
    },
    {
      id: 'MODERATOR',
      name: 'Moderator',
      description: 'Moderator role',
      avatar: null,
      color: 16711680,
      default_permissions: [
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'USE_VAD',
        'ADD_REACTIONS',
        'SEND_TTS_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'MANAGE_MESSAGES',
        'MANAGE_THREADS',
        'USE_PUBLIC_THREADS',
        'USE_PRIVATE_THREADS',
        'USE_EXTERNAL_EMOJIS',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS'
      ]
    },
    {
      id: 'ADMINISTRATOR',
      name: 'Administrator',
      avatar: null,
      description: 'Administrator role',
      color: 16711680,
      default_permissions: ['ALL_PERMISSIONS']
    }
  ],
  channel_permissions: [
    {
      id: 'PIN_MESSAGES',
      name: 'Pin Messages',
      description: 'Allows users to pin messages in the channel.'
    },
    {
      id: 'VIEW_CHANNEL',
      name: 'View Channel',
      description: 'Allows members to view a channel, which includes reading messages in text channels'
    },
    {
      id: 'SEND_MESSAGES',
      name: 'Send Messages',
      description: 'Allows members to send messages in a channel'
    },
    {
      id: 'VOICE_CONNECT',
      name: 'Voice Connect',
      description: 'Allows members to connect to a voice channel'
    },
    {
      id: 'VOICE_SPEAK',
      name: 'Voice Speak',
      description: 'Allows members to speak in a voice channel'
    },
    {
      id: 'USE_VAD',
      name: 'Use Voice Activity',
      description: 'Allows members to use voice-activity-detection in a voice channel'
    },
    {
      id: 'VIDEO_STREAM',
      name: 'Video',
      description: 'Allows members to stream video in a voice channel'
    },
    {
      id: 'MEDIA_STREAM',
      name: 'Media',
      description: 'Allows members to stream media in a voice channel'
    },
    {
      id: 'USE_APPLICATION_COMMANDS',
      name: 'Use Slash Commands',
      description: 'Allows the user to use slash commands'
    },
    {
      id: 'KICK_MEMBERS',
      name: 'Kick Members',
      description: 'Allows members to kick other members'
    },
    {
      id: 'BAN_MEMBERS',
      name: 'Ban Members',
      description: 'Allows members to ban other members'
    },
    {
      id: 'MUTE_MEMBERS',
      name: 'Mute Members',
      description: 'Allows members to mute other members'
    },
    {
      id: 'DEAFEN_MEMBERS',
      name: 'Deafen Members',
      description: 'Allows members to deafen other members'
    },
    {
      id: 'MOVE_MEMBERS',
      name: 'Move Members',
      description: 'Allows members to move other members between voice channels'
    },
    {
      id: 'MANAGE_CHANNELS',
      name: 'Manage Channels',
      description: 'Allows members to create, edit, and delete channels'
    },
    {
      id: 'MANAGE_ROLES',
      name: 'Manage Roles',
      description: 'Allows members to create, edit, and delete roles'
    },
    {
      id: 'MANAGE_WEBHOOKS',
      name: 'Manage Webhooks',
      description: 'Allows members to create, edit, and delete webhooks'
    },
    {
      id: 'MANAGE_EMOJIS',
      name: 'Manage Emojis',
      description: 'Allows members to create, edit, and delete emojis'
    },
    {
      id: 'MANAGE_THREADS',
      name: 'Manage Threads',
      description: 'Allows members to create, edit, and delete threads'
    },
    {
      id: 'USE_PUBLIC_THREADS',
      name: 'Use Public Threads',
      description: 'Allows members to use public threads'
    },
    {
      id: 'USE_PRIVATE_THREADS',
      name: 'Use Private Threads',
      description: 'Allows members to use private threads'
    },
    {
      id: 'USE_EXTERNAL_EMOJIS',
      name: 'Use External Emojis',
      description: 'Allows members to use emojis from different guilds'
    },
    {
      id: 'ADD_REACTIONS',
      name: 'Add Reactions',
      description: 'Allows members to add reactions to messages'
    },
    {
      id: 'SEND_TTS_MESSAGES',
      name: 'Send TTS Messages',
      description: 'Allows members to send TTS messages'
    },
    {
      id: 'MANAGE_MESSAGES',
      name: 'Manage Messages',
      description: 'Allows members to delete and edit other members messages'
    },
    {
      id: 'EMBED_LINKS',
      name: 'Embed Links',
      description: 'Allows members to send messages that contain links'
    },
    {
      id: 'ATTACH_FILES',
      name: 'Attach Files',
      description: 'Allows members to attach files'
    }
  ],
  server_permissions: [
    {
      id: 'MANAGE_CHANNELS',
      name: 'Manage Channels',
      description: 'Allows the user to create, edit, and delete channels'
    },
    {
      id: 'MANAGE_CATEGORIES',
      name: 'Manage Categories',
      description: 'Allows the user to create, edit, and delete categories'
    },
    {
      id: 'MANAGE_ROLES',
      name: 'Manage Roles',
      description: 'Allows the user to create, edit, and delete roles'
    },
    {
      id: 'MANAGE_WEBHOOKS',
      name: 'Manage Webhooks',
      description: 'Allows the user to create, edit, and delete webhooks'
    },
    {
      id: 'MANAGE_EMOJIS',
      name: 'Manage Emojis',
      description: 'Allows the user to create, edit, and delete emojis'
    },
    {
      id: 'MANAGE_GUILD',
      name: 'Manage Server',
      description: 'Allows the user to edit the server information, region, etc.'
    },
    {
      id: 'KICK_MEMBERS',
      name: 'Kick Members',
      description: 'Allows the user to kick members from the server'
    },
    {
      id: 'BAN_MEMBERS',
      name: 'Ban Members',
      description: 'Allows the user to ban members from the server'
    }
  ]
}
