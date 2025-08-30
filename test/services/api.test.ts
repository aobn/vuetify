import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiService } from '../../src/services/api'

// 模拟 fetch
global.fetch = vi.fn()

describe('API 服务', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('成功获取数据', async () => {
    const mockData = { id: 1, name: '测试数据' }
    
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    const result = await apiService.get('/test')
    
    expect(fetch).toHaveBeenCalledWith('/api/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(mockData)
  })

  it('处理 API 错误', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    })

    await expect(apiService.get('/nonexistent')).rejects.toThrow('API Error: 404 Not Found')
  })

  it('发送 POST 请求', async () => {
    const postData = { name: '新数据' }
    const responseData = { id: 2, ...postData }
    
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => responseData
    })

    const result = await apiService.post('/create', postData)
    
    expect(fetch).toHaveBeenCalledWith('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    expect(result).toEqual(responseData)
  })
})