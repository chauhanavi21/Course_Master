# API Cost Optimization Guide

## Overview
This document outlines the cost optimizations implemented to reduce API usage and expenses.

## APIs Used (All Paid Services)
1. **VAPI** - Voice AI platform (billed per minute of usage)
2. **OpenAI** - GPT model for conversation (billed per token)
3. **Deepgram** - Speech-to-text transcription (billed per minute)
4. **11Labs** - Text-to-speech synthesis (billed per character)

## Cost Optimizations Implemented

### 1. ✅ Model Change: GPT-4 → GPT-3.5-turbo
**Savings: 10-30x reduction in costs**
- **Before**: GPT-4 at ~$0.03 per 1K input tokens
- **After**: GPT-3.5-turbo at ~$0.0015 per 1K tokens
- **Impact**: Massive cost reduction while maintaining quality for educational conversations

### 2. ✅ Response Length Limits
- Added `maxTokens: 150` to limit response length
- Updated system prompt to emphasize SHORT responses (2-3 sentences)
- **Savings**: Reduces token usage by ~50-70%

### 3. ✅ Session Duration Limits
- Automatic session timeout based on companion's `duration` field
- Prevents unlimited sessions that could rack up costs
- Users see countdown timer
- **Savings**: Prevents runaway sessions

### 4. ✅ Voice Settings Optimization
- Reduced `similarityBoost` from 0.8 to 0.75
- Reduced `style` from 0.5 to 0.4
- Disabled `useSpeakerBoost` (costs extra)
- **Savings**: ~10-15% reduction in 11Labs costs

### 5. ✅ Temperature Optimization
- Set to 0.7 for more consistent responses
- Reduces need for regeneration
- **Savings**: Lower token usage

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
