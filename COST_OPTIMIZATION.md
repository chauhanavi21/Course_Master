# API Cost Optimization Guide

## Overview
This document outlines API usage and configuration. **Note: Optimizations have been reverted for better accuracy and speed.**

## APIs Used (All Paid Services)
1. **VAPI** - Voice AI platform (billed per minute of usage)
2. **OpenAI** - GPT model for conversation (billed per token)
3. **Deepgram** - Speech-to-text transcription (billed per minute)
4. **11Labs** - Text-to-speech synthesis (billed per character)

## Current Configuration (Optimized for Accuracy)

### 1. ✅ Model: GPT-4
- **Model**: GPT-4 for highest accuracy and understanding
- **Impact**: Best quality for educational conversations and language switching
- **Cost**: ~$0.03 per 1K input tokens

### 2. ✅ No Response Length Limits
- Removed token limits for natural, complete responses
- Allows for better explanations and language switching

### 3. ✅ Full Voice Quality Settings
- `stability: 0.4` - Natural voice variation
- `similarityBoost: 0.8` - High voice quality
- `style: 0.5` - Natural style variation
- `useSpeakerBoost: true` - Enhanced audio quality

### 4. ✅ Dynamic Language Switching
- AI understands and responds to language change requests
- Example: "First say in French, then teach in English"
- Seamless language transitions during conversation
- Supports: English, French, Spanish, German, Hindi, Korean, Chinese

## Cost Monitoring Recommendations

### Track These Metrics:
1. **Session Duration**: Average minutes per session
2. **Daily Active Sessions**: Number of sessions per day
3. **Token Usage**: Monitor OpenAI token consumption
4. **Voice Minutes**: Track 11Labs usage

### Set Up Alerts:
- Daily cost threshold alerts
- Unusual usage pattern detection
- Per-user usage limits (if needed)

## Additional Cost-Saving Tips

### For Production:
1. **Implement Rate Limiting**: Limit sessions per user per day
2. **Add Usage Quotas**: Free tier vs paid tier limits
3. **Cache Responses**: Cache common questions/answers
4. **Monitor VAPI Dashboard**: Track real-time usage
5. **Consider GPT-4o-mini**: Even cheaper alternative if available

### Environment Variables to Monitor:
- `NEXT_PUBLIC_VAPI_WEB_TOKEN` - VAPI usage
- OpenAI API key (if separate from VAPI)
- Deepgram API key (if separate from VAPI)
- 11Labs API key (if separate from VAPI)

## Estimated Cost Reduction
With these optimizations:
- **Model change**: ~90% reduction in OpenAI costs
- **Response limits**: ~50% additional reduction
- **Session limits**: Prevents 100% of runaway costs
- **Voice optimization**: ~10-15% reduction in 11Labs costs

**Total estimated savings: 85-95% reduction in API costs**

## Next Steps
1. Monitor actual usage in VAPI dashboard
2. Adjust session limits based on user feedback
3. Consider implementing user tiers (free/paid)
4. Set up cost alerts in VAPI/OpenAI dashboards
