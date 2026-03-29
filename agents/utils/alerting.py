"""
Alert system for agent notifications.
Supports Slack, Discord, and console logging.
"""
import httpx
import os
from datetime import datetime
from typing import Literal

async def send_alert(message: str, priority: Literal["low", "medium", "high"] = "medium"):
    """
    Send alert via configured channels.
    Priority levels: low (info), medium (warning), high (critical)
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted_message = f"[{timestamp}] [{priority.upper()}] {message}"
    
    # Always log to console
    print(formatted_message)
    
    # Send to Slack if configured
    slack_webhook = os.getenv("SLACK_WEBHOOK")
    if slack_webhook:
        await send_slack(slack_webhook, message, priority)
    
    # Send to Discord if configured
    discord_webhook = os.getenv("DISCORD_WEBHOOK")
    if discord_webhook:
        await send_discord(discord_webhook, message, priority)

async def send_slack(webhook_url: str, message: str, priority: str):
    """Send message to Slack."""
    emoji_map = {"low": ":information_source:", "medium": ":warning:", "high": ":rotating_light:"}
    emoji = emoji_map.get(priority, ":robot_face:")
    
    payload = {
        "text": f"{emoji} *Agent Alert*",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"{emoji} *{priority.upper()} Priority*\n{message}"
                }
            }
        ]
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(webhook_url, json=payload, timeout=10.0)
            response.raise_for_status()
    except Exception as e:
        print(f"Failed to send Slack alert: {e}")

async def send_discord(webhook_url: str, message: str, priority: str):
    """Send message to Discord."""
    color_map = {"low": 3447003, "medium": 16776960, "high": 15158332}  # Blue, Yellow, Red
    color = color_map.get(priority, 3447003)
    
    payload = {
        "embeds": [{
            "title": f"{priority.upper()} Priority Alert",
            "description": message,
            "color": color,
            "timestamp": datetime.utcnow().isoformat()
        }]
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(webhook_url, json=payload, timeout=10.0)
            response.raise_for_status()
    except Exception as e:
        print(f"Failed to send Discord alert: {e}")
